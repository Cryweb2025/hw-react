import { Link, useParams } from "react-router-dom";
import type { IPost } from "./PostList";
import { useEffect, useState } from "react";
import axios from "axios";
import type { IUser } from "./UserList";

const PostDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [post, setPost] = useState<IPost | null>(null);
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    axios
      .get<IPost>(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((res) => res.data)
      .then((data) => {
        setPost(data);
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (!post?.userId) return;
    setLoading(true);
    setError("");
    axios
      .get<IUser>(`https://jsonplaceholder.typicode.com/users/${post?.userId}`)
      .then((res) => res.data)
      .then((data) => {
        setUser(data);
      })
      .catch((error) => {
        console.error(error.message);
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, [post?.userId]);

  if (!post) {
    return <div className="container mt-4">Пост не найден</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Подробный пост</h2>
      <div className="card mt-3 shadow-sm">
        <div className="card-body">
          <h4 className="card-title">{post.title}</h4>
          <h6 className="card-subtitle mb-2 text-muted">пост id: {post.id}</h6>
          <p className="card-text">{post.body}</p>
          <h6 className="card-subtitle mb-2">
            Опубликовано пользователем:{" "}
            <Link to={`/users/${post.userId}`}>{user?.name}</Link>
          </h6>
          <Link to="/posts" className="btn btn-secondary btn-sm mt-4">
            Вернуться назад к списку постов
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

export default PostDetails;
