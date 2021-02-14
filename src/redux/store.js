import { configureStore } from '@reduxjs/toolkit'
import { reducers } from './index';
const store = configureStore({ reducer: reducers });
export default store;