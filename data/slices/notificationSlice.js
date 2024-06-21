import { createSlice } from '@reduxjs/toolkit'

const initialState = {
 notifications: []
}

export const notificationSlice = createSlice({
  name: 'notificationData',
  initialState,
  reducers: {
   addNotification: (state, action) => {
    state.notifications = [action.payload, ...state.notifications]
   },
   removeNotification: (state, action) => {
    state.notifications = state.notifications.filter((item) => item.nid !== action.payload);
   },
   initNotifications: (state, action) => {
    state.notifications = action.payload
   }
  }
})


export const { addNotification, removeNotification, initNotifications } = notificationSlice.actions;
const notificationReducer = notificationSlice?.reducer;
export default notificationReducer;