import { configureStore } from '@reduxjs/toolkit'
import  favoriteReducer  from './reducers/favoriteSlice'
import  sightsReducer from './reducers/sightSlice'


export const store = configureStore({
  reducer: {
    sights: sightsReducer,
    favorites: favoriteReducer
  },
})