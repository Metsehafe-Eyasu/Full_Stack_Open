import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => {
      return action.payload
    },
    removeUser: () => {
      return null
    }
  }
})

export const setUser = (user) => {
  return async (dispatch) => {
    dispatch(userSlice.actions.setUser(user))
    window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
  }
}

export const removeUser = () => {
  return async (dispatch) => {
    dispatch(userSlice.actions.removeUser())
  }
}

export default userSlice.reducer