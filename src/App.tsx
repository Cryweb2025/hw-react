import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import UserList from "./components/UserList";
import CommentList from "./components/CommentList";
import UserDetails from "./components/UserDetails";
import CommentDetails from "./components/CommentDetails";
import PostList from "./components/PostList";
import PostDetails from "./components/PostDetails";
import { useContext, useState } from "react";
import { ThemeContext, type IThemeContext } from "./utils/themeContext";
import { languageContext } from "./utils/languageContext";

// SPA - Single Page Application
function App() {
  const [language, setLanguage] = useState<"ru" | "en" | "de">("ru");

  const { theme, setTheme } = useContext<IThemeContext>(ThemeContext);
  const isDark = theme === "dark";
  const newTheme = isDark ? "light" : "dark";
  return (
    <languageContext.Provider value={{ language, setLanguage }}>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">
            {language === "ru"
              ? "Домашняя страница"
              : language === "en"
              ? "Homepage"
              : "Startseite"}
          </Link>
          <div>
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  {language === "ru"
                    ? "Пользователи"
                    : language === "en"
                    ? "Users list"
                    : "Benutzerliste"}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/comments">
                  {language === "ru"
                    ? "Комментарии"
                    : language === "en"
                    ? "Comments"
                    : "Kommentare"}
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/posts">
                  {language === "ru"
                    ? "Посты"
                    : language === "en"
                    ? "Posts"
                    : "Beiträge"}
                </Link>
              </li>
              <li className="nav-item">
                <button
                  className="nav-link btn btn-info"
                  onClick={() => setTheme(newTheme)}
                >
                  {language === "ru"
                    ? "Сменить тему на: " + newTheme
                    : language === "en"
                    ? "Toggle theme: " + newTheme
                    : "Thema ändern: " + newTheme}
                </button>
              </li>

              <li className="nav-item">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    {language === "ru"
                      ? "Сменить язык"
                      : language === "en"
                      ? "Change language"
                      : "Sprache ändern"}
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => setLanguage("ru")}
                      >
                        {language === "ru"
                          ? "Русский"
                          : language === "en"
                          ? "Russian"
                          : "Russisch"}
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => setLanguage("en")}
                      >
                        {language === "ru"
                          ? "Английский"
                          : language === "en"
                          ? "English"
                          : "Englisch"}
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="#"
                        onClick={() => setLanguage("de")}
                      >
                        {language === "ru"
                          ? "Немецкий"
                          : language === "en"
                          ? "German"
                          : "Deutsch"}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<div>Добро пожаловать на наш сайт!</div>} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users/:id" element={<UserDetails />} />
        <Route path="/comments" element={<CommentList />} />
        <Route path="/comments/:id" element={<CommentDetails />} />
        <Route path="/posts/" element={<PostList />} />
        <Route path="/posts/:id" element={<PostDetails />} />
      </Routes>
    </languageContext.Provider>
  );
}

export default App;
