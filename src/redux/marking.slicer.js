import { createSlice } from '@reduxjs/toolkit';
import { myMark, loadList, upsertMark, deleteMark } from './marking.thunks';
import Confs from '../confs';
export default createSlice({
  name: 'marking',
  initialState: {

    // sharing
    inited: 'initial', // pending, success, failure; first ajax load status

    // EditMark
    pageKey: false,
    editing: false,
    deleing: false,
    markDoc: false,
    formObj: Confs.marking.default_formObj(),

    // MarkList
    pageKeys: false,
    sortBy: false,
    badges: false,
    markKvs: {},
    markLis: Confs.marking.default_markLis(),
    pageDoc: false,
    relaKvs: {},
    voteKvs: {},
  },
  reducers: {
    // base
    set_pageKey(state, action) {
      state.pageKey = action.payload;
    },

    // form
    set_editing(state, action) {
      state.editing = action.payload;
    },
    set_deleing(state, action) {
      state.deleing = action.payload;
    },
    set_form_errorNo(state, action) {
      const errorNo = action.payload;
      state.formObj.errorNo = errorNo;
    },
    set_form_posting(state, action) {
      const posting = action.payload;
      state.formObj.posting = posting;
    },
    set_form_martus(state, action) {
      const martus = action.payload;
      state.formObj.martus = martus;
    },
    set_form_score(state, action) {
      const score = action.payload;
      state.formObj.score = score;
    },
    set_form_comment(state, action) {
      const comment = action.payload;
      state.formObj.comment = comment || '';
    },

    // mark list
    set_badges(state, action) {
      state.badges = action.payload;
    },
    set_sortBy(state, action) {
      const sortBy = action.payload;
      state.sortBy = sortBy;
      window.localStorage.setItem(Confs.localStorageKeys.marking_sortBy, sortBy);
      state.markLis = Confs.marking.default_markLis();
    },

    // vote post
    set_voteKvs(state, action) {
      let { markOid, voteVal } = action.payload;
      if ([0, 1, 2].includes(voteVal)) {
        state.voteKvs[markOid] = voteVal;
      }
    },
    inc_mark_LikeAndHate(state, action) {
      const { markOid, incLike, incHate } = action.payload;
      if (state.markKvs[markOid]) {
        state.markKvs[markOid].countLike += incLike;
        state.markKvs[markOid].countHate += incHate;
      }
    },

  },
  extraReducers: {

    // myMark edit
    [myMark.pending]: (state, action) => {
      state.inited = 'pending';
    },
    [myMark.fulfilled]: (state, action) => {
      const { error, eno, res } = action.payload;

      if (error || eno) {
        state.inited = 'failure';
        return;
      }

      const { markDoc } = res;
      state.markDoc = markDoc;

      if (markDoc) {
        Object.assign(state.formObj, {
          martus: markDoc.martus,
          score: markDoc.score,
          comment: markDoc.comment || '',
        });
      }
      state.inited = 'success';
    },
    [myMark.rejected]: (state, action) => {
      state.inited = 'failure';
    },

    // upsertMark
    [upsertMark.pending]: (state, action) => {
      state.formObj.posting = true;
    },
    [upsertMark.fulfilled]: (state, action) => {
      const { error, eno, res } = action.payload;

      if (error || eno) {
        state.formObj.errorNo = eno || Confs.eno.unknownError;
        state.formObj.posting = false;
        return;
      }

      const { newMarkDoc } = res;
      state.markDoc = newMarkDoc;
      Object.assign(state.formObj, {
        martus: newMarkDoc.martus,
        score: newMarkDoc.score,
        comment: newMarkDoc.comment || '',
      });

      state.formObj.posting = false;
      state.editing = false;
    },
    [upsertMark.rejected]: (state, action) => {
      state.formObj.errorNo = Confs.eno.unknownError;
      state.formObj.posting = false;
    },

    // deleteMark
    [deleteMark.pending]: (state, action) => {
      state.deleing = true;
    },
    [deleteMark.fulfilled]: (state, action) => {
      const { error, eno, res } = action.payload;

      state.markDoc = null;
      state.formObj = Confs.marking.default_formObj();

      state.deleing = false;
    },
    [deleteMark.rejected]: (state, action) => {
      state.deleing = false;
    },

    // loadList
    [loadList.pending]: (state, action) => {
      const { sortBy } = action.meta.arg;
      if (sortBy !== state.sortBy) {
        return;
      }
      state.markLis.loadStatus = 'pending';

      // prevent second time init
      if (['initial', 'failure'].includes(state.inited)) {
        state.inited = 'pending';
      }
    },
    [loadList.fulfilled]: (state, action) => {
      const { sortBy } = action.meta.arg;
      if (sortBy !== state.sortBy) {
        return;
      }
      const { error, eno, res } = action.payload;
      if (error || eno) {
        state.markLis.loadStatus = 'failure';
        return;
      }
      const { markLis, prevOid, prevPos, isLast, voteKvs } = res;

      if (voteKvs) {
        Object.assign(state.voteKvs, voteKvs);
      }

      for (const row of markLis) {
        const markOid = row._id;
        state.markKvs[markOid] = row;
        if (state.markLis.markOids.includes(markOid) === false) {
          state.markLis.markOids.push(markOid);
        }
      }
      state.markLis.prevOid = prevOid;
      state.markLis.prevPos = prevPos;
      state.markLis.isLast = isLast;
      state.markLis.loadStatus = isLast ? 'no_more' : 'success';

      if (state.inited === 'pending') {
        state.inited = 'success';
      }
    },
    [loadList.rejected]: (state, action) => {
      const { sortBy } = action.meta.arg;
      if (sortBy !== state.sortBy) {
        return;
      }
      state.markLis.loadStatus = 'failure';

      if (state.inited === 'pending') {
        state.inited = 'failure';
      }
    },

  },
});