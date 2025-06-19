import { configureStore } from '@reduxjs/toolkit'
import useReducer from './slices/user'

export const store = configureStore({
  reducer: {
    // Вказуємо, що ключ 'user' відповідає редюсеру userReducer
    user: useReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;