import { createSlice } from "@reduxjs/toolkit";
import blogService from "../../../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    appendBlog: (state, action) => {
      state.push(action.payload);
    },
    setBlogs: (state, action) => {
      return action.payload;
    },
    updateBlog: (state, action) => {
      const updatedBlog = action.payload;
      const id = updatedBlog.id;
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog));
    },
    deleteBlog: (state, action) => {
      const id = action.payload;
      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { appendBlog, setBlogs, updateBlog, deleteBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    blogs.sort((a, b) => b.likes - a.likes);
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(appendBlog(newBlog));
  };
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog);
    dispatch(updateBlog(updatedBlog));
  };
}

export const removeBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog);
    dispatch(deleteBlog(blog.id));
  };
}

export default blogSlice.reducer;
