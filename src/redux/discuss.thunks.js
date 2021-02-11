
import { createAsyncThunk } from '@reduxjs/toolkit';

import { discuss_loadList, discuss_createPost, discuss_votePost } from './networks';

export const loadList = createAsyncThunk(
  'discuss/loadList_status',
  async (data = {}, thunkAPI) => {
    const resp = await discuss_loadList(data);
    const json = await resp.json();
    return json;
  }, { condition: (data = {}, { getState, extra }) => { } }
);

export const createPost = createAsyncThunk(
  'discuss/createPost_status',
  async (data = {}, thunkAPI) => {
    const resp = await discuss_createPost(data);
    const json = await resp.json();
    return json;
  }, { condition: (data = {}, { getState, extra }) => { } }
);

export const votePost = createAsyncThunk(
  'discuss/votePost_status',
  async (data = {}, thunkAPI) => {
    const resp = await discuss_votePost(data);
    const json = await resp.json();
    return json;
  }, { condition: (data = {}, { getState, extra }) => { } }
);

const exps = {
  loadList,
  createPost,
  votePost,
}
export default exps;