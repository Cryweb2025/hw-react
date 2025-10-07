import { useContext, type FC } from "react";
import type { IPost } from "./PostList";
import { Link } from "react-router-dom";
import { ThemeContext, type IThemeContext } from "../utils/themeContext";

const Post: FC<{ post: IPost }> = ({ post: { id, title, body } }) => {
  const { theme } = useContext<IThemeContext>(ThemeContext);
  const isDark = theme === "dark";

  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div
        className={`card h-100 shadow-sm ${
          isDark ? "bg-dark text-light" : "bg-light text-dark"
        }`}
      >
        <div className="card-body">
          <h4 className="card-title mt-2">{title}</h4>
          <p className="card-text mt-4">{body}</p>
          <Link to={`/posts/${id}`} className="btn btn-primary btn-sm">
            Подробнее...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Post;
