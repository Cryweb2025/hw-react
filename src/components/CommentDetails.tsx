import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { IComment } from "./CommentList";
import axios from "axios";
import { ThemeContext } from "../utils/themeContext";

const CommentDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [comment, setComment] = useState<IComment | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get<IComment>(`https://jsonplaceholder.typicode.com/comments/${id}`)
      .then((res) => res.data)
      .then((data) => {
        setComment(data);
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (!comment) {
    return <div className="container mt-4">Комментарий не найден</div>;
  }

  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div className="container mt-4">
      <h2>Подробный комментарий</h2>
      <div
        className={`card mt-3 shadow-sm ${
          isDark ? "bg-dark text-light" : "bg-light text-dark"
        }`}
      >
        <div className="card-body">
          <h4 className="card-title">Комментарий ID: {comment.id}</h4>
          <h6 className="card-subtitle mb-2">К пост ID: {comment.postId}</h6>
          <p className="card-text">
            <strong>Email:</strong> {comment.email}
          </p>
          <p className="card-text">{comment.body}</p>
          <Link to="/comments" className="btn btn-secondary btn-sm">
            Вернуться назад к списку комментариев
          </Link>
        </div>
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

export default CommentDetails;
