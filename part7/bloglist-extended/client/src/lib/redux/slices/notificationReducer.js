import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotification: (state, action) => {
      return action.payload
    },
    removeNotification: () => {
      return null
    }
  }
})

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch(notificationSlice.actions.setNotification(notification))
    setTimeout(() => {
      dispatch(notificationSlice.actions.removeNotification())
    }, time * 1000)
  }
}

export default notificationSlice.reducer