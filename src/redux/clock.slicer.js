
import { createSlice } from '@reduxjs/toolkit';
import DiscussThunks from './discuss.thunks';
import MarkingThunks from './marking.thunks';
import ProfileThunks from './profile.thunks';

const handle_server_data = (state, action) => {
  //if (state.inited) return;
  if (action.payload?.res?.serverTime) {
    state.clientTime = (new Date()).getTime();
    state.serverTime = action.payload.res.serverTime;
    state.systemTime = action.payload.res.serverTime;
    //state.inited = true;
  }
};

const clientTime = (new Date()).getTime();
export default createSlice({
  name: 'clock',
  initialState: {
    //inited: false,
    clientTime: clientTime, // the client time when set the server time
    serverTime: clientTime, // log the server time
    systemTime: clientTime, // the time value we actural use
  },
  reducers: {
    fix_systemTime(state, action) {
      state.systemTime = state.serverTime + action.payload;
    },
  },
  extraReducers: {
    [DiscussThunks.loadList.fulfilled]: handle_server_data,

    [MarkingThunks.myMark.fulfilled]: handle_server_data,
    [MarkingThunks.loadList.fulfilled]: handle_server_data,
    
    [ProfileThunks.LoadMarkList.fulfilled]: handle_server_data,
    [ProfileThunks.LoadPostList.fulfilled]: handle_server_data,
  },
});