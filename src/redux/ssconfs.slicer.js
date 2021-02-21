
/**
 * @deprecated
 * use window._ssconfs
 */

import { createSlice } from '@reduxjs/toolkit';
import { loadList as discuss_loadList } from './discuss.thunks';
import { myMark as marking_myMark, loadList as marking_loadList } from './marking.thunks';

const handle_ajax_data = function () {
  return function (state, action) {
    const { ssconfs } = action.payload.res;
    if (ssconfs) {
      Object.assign(state.ssconfs, ssconfs);
    }
  };
}
/**
 * ssconfs = server side configures
 * some configs are defined on the server side
 * and can be used both at server side and client side
 * so we just load it here and don't want to write the same config file here again
 */
export default createSlice({
  name: 'users',
  initialState: {
    ssconfs: {}, // key(userIid) => value(userDoc) cache all user info
  },
  reducers: {},
  extraReducers: {
    [discuss_loadList.fulfilled]: handle_ajax_data(),
    [marking_myMark.fulfilled]: handle_ajax_data(),
    [marking_loadList.fulfilled]: handle_ajax_data(),
  },
});