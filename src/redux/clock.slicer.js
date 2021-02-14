
import { createSlice } from '@reduxjs/toolkit';
import { loadList as discuss_loadList } from './discuss.thunks';
import { myMark as marking_myMark, loadList as marking_loadList } from './marking.thunks';

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
    [discuss_loadList.fulfilled]: handle_server_data,
    [marking_myMark.fulfilled]: handle_server_data,
    [marking_loadList.fulfilled]: handle_server_data,
  },
});