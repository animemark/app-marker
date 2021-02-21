
import { createSlice } from '@reduxjs/toolkit';
import DiscussThunks from './discuss.thunks';
import MarkingThunks from './marking.thunks';
import ProfileThunks from './profile.thunks';

const handle_server_data = function () {
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
    [DiscussThunks.loadList.fulfilled]: handle_server_data(),

    [MarkingThunks.myMark.fulfilled]: handle_server_data(),
    [MarkingThunks.loadList.fulfilled]: handle_server_data(),

    [ProfileThunks.LoadMarkList.fulfilled]: handle_server_data(),
    [ProfileThunks.LoadPostList.fulfilled]: handle_server_data(),
  },
});