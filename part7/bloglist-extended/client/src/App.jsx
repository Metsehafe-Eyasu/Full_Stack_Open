import { useState, useEffect, useRef } from "react";
import blogService from "./services/blogs";
import Blog from "./components/Blog";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./lib/redux/slices/notificationReducer";
import { setUser, removeUser } from "./lib/redux/slices/userReducer";
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  removeBlog,
} from "./lib/redux/slices/blogReducer";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const User = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blog);
  
  const blogFormRef = useRef(null);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      dispatch(setUser(user))
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    dispatch(initializeBlogs())
  }, []);

  const addBlog = async (blogObject) => {
    try {
      dispatch(createBlog(blogObject));
      dispatch(
        setNotification(
          {
            message: `a new blog ${blogObject.title} by ${blogObject.author} added`,
            type: "success",
          },
          5,
        ),
      );
    } catch (exception) {
      dispatch(
        setNotification(
          {
            message: exception.response.data.error,
            type: "error",
          },
          5,
        ),
      );
    }
    blogFormRef.current.toggleVisibility();
  };

  const updateBlog = async (id, blogObject) => {
    try {
      dispatch(likeBlog(id, blogObject));
    } catch (exception) {
      dispatch(
        setNotification(
          {
            message: exception.response.data.error,
            type: "error",
          },
          5,
        ),
      );
    }
  };

  const deleteBlog = async (id) => {
    try {
      dispatch(removeBlog(id));
      dispatch(
        setNotification(
          {
            message: "Blog removed successfully",
            type: "success",
          },
          5,
        ),
      );
    } catch (exception) {
      dispatch(
        setNotification(
          {
            message: exception.response.data.error,
            type: "error",
          },
          5,
        ),
      );
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
      dispatch(setUser(user));
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(
        setNotification(
          {
            message: exception.response.data.error,
            type: "error",
          },
          5,
        ),
      );
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
    dispatch(removeUser());
  };

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      {User === null && loginForm()}
      {User !== null && (
        <div>
          <p>
            {User.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <div>{blogForm()}</div>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              removeBlog={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
