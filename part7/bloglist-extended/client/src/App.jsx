import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import Blog from "./components/Blog";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import "./App.css";
import { useDispatch } from "react-redux";
import { setNotification } from "./lib/redux/slices/notificationSlice";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [User, setUser] = useState(null);
  const dispatch = useDispatch();

  const blogFormRef = useRef(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService
      .getAll()
      .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
  }, []);

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      dispatch(setNotification({
        message: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
        type: "success",
      }, 5))
    } catch (exception) {
      dispatch(setNotification({
        message: exception.response.data.error,
        type: "error",
      }, 5));
    }
    blogFormRef.current.toggleVisibility();
  };

  const updateBlog = async (id, blogObject) => {
    try {
      const returnedBlog = await blogService.update(id, blogObject);
      console.log(returnedBlog);
      setBlogs(
        blogs
          .map((blog) => (blog.id !== id ? blog : returnedBlog))
          .sort((a, b) => b.likes - a.likes),
      );
    } catch (exception) {
      dispatch(setNotification({
        message: exception.response.data.error,
        type: "error",
      }, 5));
    }
  };

  const removeBlog = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(blogs.filter((blog) => blog.id !== id));
      dispatch(setNotification({
        message: "Blog removed successfully",
        type: "success",
      }, 5));
    } catch (exception) {
      dispatch(setNotification({
        message: exception.response.data.error,
        type: "error",
      }, 5));
    }
  };

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    );
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      setUser(user);
      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(setNotification({
        message: exception.response.data.error,
        type: "error",
      }, 5));
    }
  };

  const loginForm = () => {
    return (
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            id="username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            id="password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">
          login
        </button>
      </form>
    );
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {User === null && loginForm()}
      {User !== null && (
        <div>
          <p>
            {" "}
            {User.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <div>{blogForm()}</div>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              removeBlog={removeBlog}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
