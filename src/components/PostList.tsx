import axios from "axios";
import { useEffect, useState } from "react";
import Post from "./Post";

export interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const PostList = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get<IPost[]>("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.data)
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Список постов</h2>
      <div className="row g-3">
        {posts
          .filter((_, i) => i < 50)
          .map((e) => (
            <Post key={e.id} post={e} />
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

export default PostList;
