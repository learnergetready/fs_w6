import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  return action.payload
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, dispatchNotification] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, dispatchNotification] }>
      {props.children}
      </NotificationContext.Provider>
  )
}

export default NotificationContext