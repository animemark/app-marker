
import { createSlice } from '@reduxjs/toolkit';
import ProfileThunks from './profile.thunks';

import Funcs from '../funcs';

export default createSlice({
  name: 'clock',
  initialState: {
    status: 'initial', // first load status
    params: undefined, // from the parent url

    mkerUid: 0, // who's profile currently visiting

    markList: {
      loadStatus: 'initial',

      prevOid: null,
      prevPos: null,

      markKvs: {},
      relaKvs: {},
      voteKvs: {},

      markOids: [],
      relaIids: [],
    },

    postList: {
      loadStatus: 'initial',

      prevOid: null,
      prevPos: null,

      postOids: [],
      relaIids: [],

      postKvs: {},
      relaKvs: {},
      voteKvs: {},
    },

    subjectList: {},
    episodeList: {},
  },
  reducers: {
    set_status(state, action) {
      state.status = action.payload;
    },
    set_params(state, action) {
      state.params = action.payload;
    },
  },
  extraReducers: {
    // LoadMarkList
    [ProfileThunks.LoadMarkList.pending]: (state, action) => {
      state.markList.loadStatus = 'pending';
      Funcs.util.next_state_status(state, 'pending');
    },
    [ProfileThunks.LoadMarkList.fulfilled]: (state, action) => {
      const state_markList = state.markList;
      const { eno, res } = action.payload;

      if (eno) {
        state_markList.loadStatus = 'failure';
        Funcs.util.next_state_status(state, 'failure');
        return;
      }

      const {
        mkerIid,

        isLast,

        prevOid,
        prevPos,

        markLis,
        relaKvs,

        markKvs,
        relaLis,

        voteKvs,
      } = res;

      state.mkerIid = mkerIid;

      if (markLis) {
        for (const row of markLis) {
          const markOid = row._id;
          state_markList.markKvs[markOid] = row;
          if (state_markList.markOids.includes(markOid) === false) {
            state_markList.markOids.push(markOid);
          }
        }
      }
      if (relaLis) {
        for (const row of relaLis) {
          const relaiid = row.iid;
          state_markList.relaKvs[relaiid] = row;
          if (state_markList.relaIids.includes(relaiid) === false) {
            state_markList.relaIids.push(relaiid);
          }
        }
      }
      if (markKvs) {
        Object.assign(state_markList.markKvs, markKvs);
      }
      if (relaKvs) {
        Object.assign(state_markList.relaKvs, relaKvs);
      }

      if (voteKvs) {
        Object.assign(state_markList.voteKvs, voteKvs);
      }

      Object.assign(state_markList, {
        prevOid,
        prevPos,
      });

      state_markList.loadStatus = isLast ? 'no_more' : 'success';
      Funcs.util.next_state_status(state, 'success');
    },
    [ProfileThunks.LoadMarkList.rejected]: (state, action) => {
      state.markList.loadStatus = 'failure';
      Funcs.util.next_state_status(state, 'failure');
    },

    // LoadPostList
    [ProfileThunks.LoadPostList.pending]: (state, action) => {
      state.postList.loadStatus = 'pending';
      Funcs.util.next_state_status(state, 'pending');
    },
    [ProfileThunks.LoadPostList.fulfilled]: (state, action) => {
      const state_postList = state.postList;
      const { eno, res } = action.payload;

      if (eno) {
        state_postList.loadStatus = 'failure';
        Funcs.util.next_state_status(state, 'failure');
        return;
      }

      const {
        mkerIid,

        isLast,

        prevOid,
        prevPos,

        postLis,
        postKvs,
        relaKvs,
        voteKvs,
      } = res;

      state.mkerIid = mkerIid;

      if (postLis) {
        for (const row of postLis) {
          const postOid = row._id;
          state_postList.postKvs[postOid] = row;
          if (state_postList.postOids.includes(postOid) === false) {
            state_postList.postOids.push(postOid);
          }
        }
      }
      if (postKvs) {
        Object.assign(state_postList.postKvs, postKvs);
      }
      if (relaKvs) {
        Object.assign(state_postList.relaKvs, relaKvs);
      }
      if (voteKvs) {
        Object.assign(state_postList.voteKvs, voteKvs);
      }

      Object.assign(state_postList, {
        prevOid,
        prevPos,
      });

      state_postList.loadStatus = isLast ? 'no_more' : 'success';
      Funcs.util.next_state_status(state, 'success');
    },
    [ProfileThunks.LoadPostList.rejected]: (state, action) => {
      state.postList.loadStatus = 'failure';
      Funcs.util.next_state_status(state, 'failure');
    },
  },
});