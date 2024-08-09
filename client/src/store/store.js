import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

const useAppDispatch = () => useDispatch();
const useAppSelector = (selector) => useSelector(selector);

export { useAppDispatch, useAppSelector };
export default store;
