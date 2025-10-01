import { useContext, type FC } from "react";
import type { IComment } from "./CommentList";
import { Link } from "react-router-dom";
import { ThemeContext } from "../App";

const Comment: FC<{ comment: IComment }> = ({
  comment: { body, email, name, id },
}) => {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === "dark";
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div
        className={`card h-100 shadow-sm ${
          isDark ? "bg-dark text-light" : "bg-light text-dark"
        }`}
      >
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <h6 className="card-subtitle mb-2">{email}</h6>
          <p className="card-text">{body}</p>
          <Link to={`/comments/${id}`} className="btn btn-primary btn-sm">
            Подробнее...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Comment;
