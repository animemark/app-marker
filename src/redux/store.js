import { configureStore } from '@reduxjs/toolkit'

import { reducers } from './index';

const store = configureStore({ reducer: reducers });

//console.log(store.getState())
export default store;