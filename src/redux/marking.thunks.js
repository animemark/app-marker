
import { createAsyncThunk } from '@reduxjs/toolkit';

import { marking_myMark, marking_loadList, marking_upsertMark, marking_deleteMark, marking_voteMark } from './networks';

export const myMark = createAsyncThunk(
  'marking/myMark_status',
  async (data = {}, thunkAPI) => {
    const resp = await marking_myMark(data);
    const json = await resp.json();
    return json;
  }, { condition: (data = {}, { getState, extra }) => { } }
);

export const loadList = createAsyncThunk(
  'marking/loadList_status',
  async (data = {}, thunkAPI) => {
    const resp = await marking_loadList(data);
    const json = await resp.json();
    return json;
  }, { condition: (data = {}, { getState, extra }) => { } }
);

export const upsertMark = createAsyncThunk(
  'marking/upsertMark_status',
  async (data = {}, thunkAPI) => {
    const resp = await marking_upsertMark(data);
    const json = await resp.json();
    return json;
  }, { condition: (data = {}, { getState, extra }) => { } }
);

export const deleteMark = createAsyncThunk(
  'marking/deleteMark_status',
  async (data = {}, thunkAPI) => {
    const resp = await marking_deleteMark(data);
    const json = await resp.json();
    return json;
  }, { condition: (data = {}, { getState, extra }) => { } }
);

export const voteMark = createAsyncThunk(
  'marking/voteMark_status',
  async (data = {}, thunkAPI) => {
    const resp = await marking_voteMark(data);
    const json = await resp.json();
    return json;
  }, { condition: (data = {}, { getState, extra }) => { } }
);

const exps = {
  myMark,
  loadList,
  upsertMark,
  deleteMark,
  voteMark,
}
export default exps;