
import { createAsyncThunk } from '@reduxjs/toolkit';
import { app_marker_api } from './networks';

export const LoadMarkList = createAsyncThunk(
  'profile/LoadMarkList_status',
  async (data = {}, thunkAPI) => {
    const resp = await app_marker_api('/api/profile/LoadMarkList', data);
    const json = await resp.json();
    return json;
  }, { condition: (data = {}, { getState, extra }) => { } }
);

export const LoadPostList = createAsyncThunk(
  'profile/LoadPostList_status',
  async (data = {}, thunkAPI) => {
    const resp = await app_marker_api('/api/profile/LoadPostList', data);
    const json = await resp.json();
    return json;
  }, { condition: (data = {}, { getState, extra }) => { } }
);

export const LoadTopicList = createAsyncThunk(
  'profile/LoadTopicList_status',
  async (data = {}, thunkAPI) => {
    const resp = await app_marker_api('/api/profile/LoadTopicList', data);
    const json = await resp.json();
    return json;
  }, { condition: (data = {}, { getState, extra }) => { } }
);

export const LoadReplyList = createAsyncThunk(
  'profile/LoadReplyList_status',
  async (data = {}, thunkAPI) => {
    const resp = await app_marker_api('/api/profile/LoadReplyList', data);
    const json = await resp.json();
    return json;
  }, { condition: (data = {}, { getState, extra }) => { } }
);

export const LoadSubjectList = createAsyncThunk(
  'profile/LoadSubjectList_status',
  async (data = {}, thunkAPI) => {
    const resp = await app_marker_api('/api/profile/LoadSubjectList', data);
    const json = await resp.json();
    return json;
  }, { condition: (data = {}, { getState, extra }) => { } }
);

export const LoadEpisodeList = createAsyncThunk(
  'profile/LoadEpisodeList_status',
  async (data = {}, thunkAPI) => {
    const resp = await app_marker_api('/api/profile/LoadEpisodeList', data);
    const json = await resp.json();
    return json;
  }, { condition: (data = {}, { getState, extra }) => { } }
);


const exps = {
  LoadMarkList,
  LoadPostList,

  LoadTopicList,
  LoadReplyList,
  LoadSubjectList,
  LoadEpisodeList,
}
export default exps;