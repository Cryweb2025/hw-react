import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { v4 } from "uuid";
import User from "./User";
import {
  languageContext,
  type ILanguageContext,
} from "../utils/languageContext";

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

const UserList = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get<IUser[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.data)
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const { language } = useContext<ILanguageContext>(languageContext);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">
        {language === "ru"
          ? "Список пользователей"
          : language === "en"
          ? "Users list"
          : "Benutzerliste"}
      </h2>
      <div className="row g-3">
        {users.map((user) => (
          <User key={v4()} user={user} />
        ))}
      </div>
      <div>
        {loading && (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
      </div>
      <div>{error && <>Ошибка при загрузке данных: {error}</>}</div>
    </div>
  );
};

export default UserList;
