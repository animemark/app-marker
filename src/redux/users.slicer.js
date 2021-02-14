
import { createSlice } from '@reduxjs/toolkit';
import { loadList as discuss_loadList } from './discuss.thunks';
import { myMark as marking_myMark, loadList as marking_loadList } from './marking.thunks';

const handle_user_data = function () {
  return function (state, action) {
    const { userIid, userKvs } = action.payload.res;
    Object.assign(state, {
      userIid,
    });
    if (userKvs) {
      Object.assign(state.userKvs, userKvs);
    }
  };
}

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
    [discuss_loadList.fulfilled]: handle_user_data(),
    [marking_myMark.fulfilled]: handle_user_data(),
    [marking_loadList.fulfilled]: handle_user_data(),
  },
});