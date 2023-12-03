import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    setNotificationReducer(state, action) {
      return action.payload
    },
    clearNotification(state) {
      return null
    }
  }
})

export const { setNotificationReducer, clearNotification } = notificationSlice.actions

export const setNotification = (message, duration) => {
  return dispatch => {
    dispatch(setNotificationReducer(message))
    setTimeout(() => {
      dispatch(clearNotification())
    }, duration*1000)
  }
}

export default notificationSlice.reducer