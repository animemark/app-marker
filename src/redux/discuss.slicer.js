import { createSlice } from '@reduxjs/toolkit';
import { loadList, createPost } from './discuss.thunks';
import Confs from '../confs';
export default createSlice({
  name: 'discuss',
  initialState: {
    listAt: false, // id of the root list
    postTo: false, // id for post submit by the root form
    sortBy: false,
    badges: false,
    pageDoc: null,
    pageKvs: {},
    postKvs: {},// post key(postOid) => value(postDoc), storage all post doc
    postLis: {},// post list parentOid => [postOid list], storage info of all post list
    voteKvs: {},// current user vote record,
    formKvs: {},
  },
  reducers: {
    // common
    set_listAt(state, action) {
      const listAt = action.payload;
      // must init the top level postLis here
      state.postLis = {
        [listAt]: Confs.default_postLis_unit(),
      };
      state.listAt = listAt;
    },
    set_postTo(state, action) {
      state.postTo = action.payload;
    },
    set_badges(state, action) {
      state.badges = action.payload;
    },
    set_sortBy(state, action) {
      const sortBy = action.payload;
      state.sortBy = sortBy;
      window.localStorage.setItem(Confs.localStorageKeys.sortBy, sortBy);
      state.postLis = {
        [state.listAt]: Confs.default_postLis_unit(),
      };
    },

    // post item
    assign_postKvs(state, action) {
      Object.assign(state.postKvs, action.payload);
    },
    add_postKvs(state, action) {
      const { postOid, postDoc } = action.payload;
      state.postKvs[postOid] = postDoc;
    },
    inc_post_countChild(state, action) {
      const { postOid, value } = action.payload;
      if (state.postKvs[postOid]) {
        state.postKvs[postOid].countChild += value || 1;
      }
    },
    inc_post_countReply(state, action) {
      const { postOid, value } = action.payload;
      if (state.postKvs[postOid]) {
        state.postKvs[postOid].countReply += value || 1;
      }
    },

    // post list
    addTo_postLis(state, action) {
      const { listAt, postOid } = action.payload;
      if (typeof state.postLis[listAt] === 'undefined') {
        state.postLis[listAt] = Confs.default_postLis_unit();
      }
      if (postOid && state.postLis[listAt].postOids.includes(postOid) === false) {
        state.postLis[listAt].postOids.unshift(postOid);
      }
    },
    reset_postLis(state, action) {
      state.postLis = {
        [state.listAt]: Confs.default_postLis_unit(),
      };
    },

    // vote post
    set_voteKvs(state, action) {
      let { postOid, voteVal } = action.payload;
      if ([0, 1, 2].includes(voteVal)) {
        state.voteKvs[postOid] = voteVal;
      }
    },
    inc_post_LikeAndHate(state, action) {
      const { postOid, incLike, incHate } = action.payload;
      if (state.postKvs[postOid]) {
        state.postKvs[postOid].countLike += incLike;
        state.postKvs[postOid].countHate += incHate;
      }
    },

    // form
    init_form(state, action) {
      const postTo = action.payload;
      state.formKvs[postTo] = Confs.default_formKvs_unit();
    },
    set_form_showing(state, action) {
      const { postTo, showing } = action.payload;
      state.formKvs[postTo].showing = showing;
    },
    set_form_posting(state, action) {
      const { postTo, posting } = action.payload;
      state.formKvs[postTo].posting = posting;
    },
    set_form_message(state, action) {
      const { postTo, message } = action.payload;
      state.formKvs[postTo].message = message;
    },
    set_form_errorNo(state, action) {
      const { postTo, errorNo } = action.payload;
      state.formKvs[postTo].errorNo = errorNo;
    },
  },
  extraReducers: {
    // loadList
    [loadList.pending]: (state, action) => {
      const { listAt, sortBy } = action.meta.arg;
      if (sortBy !== state.sortBy) {
        return;
      }
      if (typeof state.postLis[listAt] === 'undefined') {
        state.postLis[listAt] = Confs.default_postLis_unit();
      }
      state.postLis[listAt].loadStatus = 'pending';
    },
    [loadList.fulfilled]: (state, action) => {
      const { listAt, sortBy } = action.meta.arg;
      if (sortBy !== state.sortBy) {
        return;
      }
      const { error, eno, res } = action.payload;
      if (error || eno) {
        state.postLis[listAt].loadStatus = 'failure';
        return;
      }
      const { pageDoc, pageKvs, postLis, prevOid, prevPos, isLast, voteKvs } = res;
      if (pageDoc) {
        state.pageDoc = pageDoc;
      }
      if (pageKvs) {
        Object.assign(state.pageKvs, pageKvs);
      }
      if (voteKvs) {
        Object.assign(state.voteKvs, voteKvs);
      }
      for (const row of postLis) {
        state.postKvs[row._id] = row;
        if (state.postLis[listAt].postOids.includes(row._id) === false) {
          state.postLis[listAt].postOids.push(row._id);
        }
      }
      state.postLis[listAt].prevOid = prevOid;
      state.postLis[listAt].prevPos = prevPos;
      state.postLis[listAt].isLast = isLast;
      state.postLis[listAt].loadStatus = isLast ? 'no_more' : 'success';
    },
    [loadList.rejected]: (state, action) => {
      const { listAt, sortBy } = action.meta.arg;
      if (sortBy !== state.sortBy) {
        return;
      }
      state.postLis[listAt].loadStatus = 'failure';
    },

    // createPost
    [createPost.pending]: (state, action) => {
      const { postTo } = action.meta.arg;
      state.formKvs[postTo].posting = true;
    },
    [createPost.fulfilled]: (state, action) => {
      const { postTo } = action.meta.arg;
      const { error, eno, res } = action.payload;

      if (error || eno) {
        state.formKvs[postTo].errorNo = eno || Confs.eno.unknownError;
        state.formKvs[postTo].posting = false;
        return;
      }
      const { postOid, postDoc } = res;

      state.postKvs[postOid] = postDoc;

      const listAt = postDoc.replyTo || state.listAt;// is not postTo, postTo maybe no a key of postLis
      if (typeof state.postLis[listAt] === 'undefined') {
        state.postLis[listAt] = Confs.default_postLis_unit();
      }
      if (postOid && state.postLis[listAt].postOids.includes(postOid) === false) {
        state.postLis[listAt].postOids.unshift(postOid);
      }

      // all ancestors node countReply +1
      let ideKeys = postDoc.ideKeys;
      let replyTo = postDoc.replyTo;
      let is_parent = true;
      while (replyTo || ideKeys) {
        if (ideKeys) {
          const parentDoc = state.pageDoc;
          if (parentDoc) {
            parentDoc.countReply++;
            if (is_parent) {
              parentDoc.countChild++;
            }
          }
          break;
        }
        if (replyTo) {
          const parentDoc = state.postKvs[replyTo];
          if (!parentDoc) { break };
          parentDoc.countReply++;
          if (is_parent) {
            parentDoc.countChild++;
          }
          ideKeys = parentDoc?.ideKeys;
          replyTo = parentDoc?.replyTo;
        }
        is_parent = false;
      }

      state.formKvs[postTo] = null; // null the form after success submit
    },
    [createPost.rejected]: (state, action) => {
      const { postTo } = action.meta.arg;
      state.formKvs[postTo].errorNo = Confs.eno.unknownError;
      state.formKvs[postTo].posting = false;
    },
  },
});