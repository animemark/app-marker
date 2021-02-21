import { createSlice } from '@reduxjs/toolkit';
import DiscussThunks from './discuss.thunks';
import Funcs from '../funcs';
import Confs from '../confs';

function reset_root_list(state) {
  state.postLis = {
    [state.params.listOf]: Confs.discuss.default_postLis_unit(),
  };
  state.formKvs = {
    [state.params.postTo]: Confs.discuss.default_formKvs_unit(),
  };
}
export default createSlice({
  name: 'discuss',
  initialState: {

    params: false,
    status: 'initial',

    sortBy: false,

    nodeOid: null,
    pageDoc: null,
    pageKvs: {},
    relaKvs: {},
    postKvs: {},// post key(postOid) => value(postDoc), storage all post doc
    postLis: {},// post list parentOid => [postOid list], storage info of all post list
    voteKvs: {},// current user vote record,
    formKvs: {},
  },
  reducers: {
    set_status(state, action) {
      state.status = action.payload;
    },
    set_params(state, action) {
      state.params = action.payload;
    },
    set_sortBy(state, action) {
      state.sortBy = action.payload;
      state.postLis = {
        [state.params.listOf]: Confs.discuss.default_postLis_unit(),
      };
      //reset_root_list(state);
      //window.localStorage.setItem(Confs.localStorageKeys.discuss_sortBy, sortBy);
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
      const { listOf, postOid } = action.payload;
      if (typeof state.postLis[listOf] === 'undefined') {
        state.postLis[listOf] = Confs.discuss.default_postLis_unit();
      }
      if (postOid && state.postLis[listOf].postOids.includes(postOid) === false) {
        state.postLis[listOf].postOids.unshift(postOid);
      }
    },
    reset_postLis(state, action) {
      state.postLis = {
        [state.params.listOf]: Confs.discuss.default_postLis_unit(),
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
      state.formKvs[postTo] = Confs.discuss.default_formKvs_unit();
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
    [DiscussThunks.loadList.pending]: (state, action) => {
      const { listOf, sortBy } = action.meta.arg;
      if (sortBy !== state.sortBy) {
        return;
      }

      if (typeof state.postLis[listOf] === 'undefined') {
        state.postLis[listOf] = Confs.discuss.default_postLis_unit();
      }
      state.postLis[listOf].loadStatus = 'pending';

      Funcs.util.next_state_status(state, 'pending');
    },
    [DiscussThunks.loadList.fulfilled]: (state, action) => {
      const { listOf, sortBy } = action.meta.arg;

      if (sortBy !== state.sortBy) {
        return;
      }

      const { eno, res } = action.payload;
      if (eno) {
        state.postLis[listOf].loadStatus = 'failure';
        Funcs.util.next_state_status(state, 'failure');
        return;
      }

      const { pageKvs, relaKvs, voteKvs, poidLis, postKvs, prevOid, prevPos, isLast } = res;
      if (pageKvs) {
        Object.assign(state.pageKvs, pageKvs);
      }
      if (relaKvs) {
        Object.assign(state.relaKvs, relaKvs);
      }
      if (voteKvs) {
        Object.assign(state.voteKvs, voteKvs);
      }
      if (postKvs) {
        Object.assign(state.postKvs, postKvs);
      }
      for (const poid of poidLis) {
        if (state.postLis[listOf].postOids.includes(poid) === false) {
          state.postLis[listOf].postOids.push(poid);
        }
      }

      state.postLis[listOf].prevOid = prevOid;
      state.postLis[listOf].prevPos = prevPos;
      state.postLis[listOf].loadStatus = isLast ? 'no_more' : 'success';

      Funcs.util.next_state_status(state, 'success');
    },
    [DiscussThunks.loadList.rejected]: (state, action) => {
      const { listOf, sortBy } = action.meta.arg;
      if (sortBy !== state.sortBy) {
        return;
      }

      state.postLis[listOf].loadStatus = 'failure';
      Funcs.util.next_state_status(state, 'failure');
    },

    // createPost
    [DiscussThunks.createPost.pending]: (state, action) => {
      const { postTo } = action.meta.arg;
      state.formKvs[postTo].posting = true;
    },
    [DiscussThunks.createPost.fulfilled]: (state, action) => {
      const { postTo } = action.meta.arg;
      const { error, eno, res } = action.payload;

      if (error || eno) {
        state.formKvs[postTo].errorNo = eno || Confs.eno.unknownError;
        state.formKvs[postTo].posting = false;
        return;
      }
      const { postOid, postDoc } = res;

      state.postKvs[postOid] = postDoc;

      const listOf = postDoc.replyTo || state.params.listOf;// is not postTo, postTo maybe no a key of postLis
      if (typeof state.postLis[listOf] === 'undefined') {
        state.postLis[listOf] = Confs.discuss.default_postLis_unit();
      }

      // if (postOid && state.postLis[listOf].postAdds.includes(postOid) === false) {
      //   state.postLis[listOf].postAdds.unshift(postOid);
      // }
      if (postOid && state.postLis[listOf].postOids.includes(postOid) === false) {
        state.postLis[listOf].postOids.unshift(postOid);
      }

      // all ancestors node countReply +1
      let pageKeys = postDoc.pageKeys;
      let replyTo = postDoc.replyTo;
      let is_parent = true;
      while (replyTo || pageKeys) {
        if (pageKeys) {
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
          pageKeys = parentDoc?.pageKeys;
          replyTo = parentDoc?.replyTo;
        }
        is_parent = false;
      }

      state.formKvs[postTo] = null; // null the form after success submit
    },
    [DiscussThunks.createPost.rejected]: (state, action) => {
      const { postTo } = action.meta.arg;
      state.formKvs[postTo].errorNo = Confs.eno.unknownError;
      state.formKvs[postTo].posting = false;
    },
  },
});