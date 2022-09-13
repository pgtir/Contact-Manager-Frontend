import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authFeatures/authSlice'
import userReducer from './userFeatures/userSlice'
import contactReducer from './contactFeatures/contactSlice'

 const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    contacts: contactReducer,
  },
})

export default store;