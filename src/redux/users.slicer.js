
import { createSlice } from '@reduxjs/toolkit';
import { loadList } from './discuss.thunks';

export default createSlice({
  name: 'users',
  initialState: {
    userIid: false, // current logged user id
    userKvs: {}, // key(userIid) => value(userDoc) cache all user info
  },
  reducers: {
    set_userIid(state, action) {
      state.userIid = action.payload;
    },
    assign_userKvs(state, action) {
      Object.assign(state.userKvs, action.payload);
    },
  },
  extraReducers: {
    [loadList.fulfilled]: (state, action) => {
      const { userIid, userKvs } = action.payload.res;
      Object.assign(state, {
        userIid,
      });
      if (userKvs) {
        Object.assign(state.userKvs, userKvs);
      }
    },
  },
});