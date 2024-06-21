import { configureStore } from '@reduxjs/toolkit'
import homePageReducer from './slices/homePageSlice'
import producPageReducer from './slices/productPageSlice'
import cartPageReducer from './slices/cartPageSlice'
import searchPageReducer from './slices/searchPageSlice'
import notificationReducer from './slices/notificationSlice'

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  }),
  reducer: {
    homePageData: homePageReducer,
    productPageData: producPageReducer,
    cartPageData: cartPageReducer,
    searchPageData: searchPageReducer,
    notificationData: notificationReducer
  },
})