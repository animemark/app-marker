import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../redux";
import PostItem from "./PostItem";
import Confs from "../confs";

function PostList(props) {
  const { listAt } = props;
  const dispatch = useDispatch();

  const { sortBy, pageDoc, postKvs, postLis: { loadStatus, postOids, prevOid, prevPos } } = useSelector(state => {
    return {
      sortBy: state.discuss.sortBy,
      pageDoc: state.discuss.pageDoc,
      postKvs: state.discuss.postKvs,
      postLis: (state.discuss.postLis[listAt] || Confs.default_postLis_unit())
    }
  });

  const parentPostDoc = postKvs[listAt] || null;
  const listDepth = (parentPostDoc?.depth || 0) + 1;

  const autoLoad = listDepth === 1 ? true : false;

  // ============
  const [isHiddenList, set_isHiddenList] = useState(false);

  useEffect(() => {
    if (autoLoad && loadStatus === "initial") {
      loadMoreAct();
    }
  });

  useEffect(() => {
    window.resizeFrameHeight('PostList');
  });

  const toggle_showHideList = () => {
    set_isHiddenList(!isHiddenList);
  };

  const loadMoreAct = () => {
    const data = {
      listAt,
      sortBy,
      prevOid,
      prevPos,
    };
    dispatch(Redux.thunks.discuss.loadList(data));
  };

  const LoadMoreDom = () => {

    if (listDepth === 1) {

      const countPostLoaded = postOids?.length || 0;
      const countChildInMax = Math.max(pageDoc?.countChild || 0, countPostLoaded);

      switch (loadStatus) {
        case 'initial':
          return (
            <button type="button" className="btn btn-sm btn-secondary" onClick={() => loadMoreAct()}>Start Load</button>
          );
        case 'success':
          if (pageDoc) {
            return (
              <button type="button" className="btn btn-sm btn-secondary" onClick={() => loadMoreAct()}>Load More ({countPostLoaded}/{countChildInMax})</button>
            );
          } else {
            return (
              <button type="button" className="btn btn-sm btn-secondary" onClick={() => loadMoreAct()}>Load More</button>
            );
          }
        case 'failure':
          return (
            <button type="button" className="btn btn-sm btn-secondary" onClick={() => loadMoreAct()}>Try Again</button>
          );
        case 'pending':
          return (
            <button type="button" className="btn btn-sm btn-secondary disabled">
              <i className="fas fa-circle-notch fa-spin"></i>
            </button>
          );
        case 'no_more':
          if (countPostLoaded) {
            return (
              <button type="button" className="btn btn-sm btn-light disabled">No More</button>
            );
          } else {
            return (
              <button type="button" className="btn btn-sm btn-light disabled">Be the first to comment.</button>
            );
          }
        default:
          break;
      }
    }

    // sub list
    const countChild = parentPostDoc?.countChild || 0;
    const countReply = parentPostDoc?.countReply || 0;
    const countPostLoaded = postOids?.length || 0;

    if (countChild) {
      switch (loadStatus) {
        case 'initial': {
          //const chis = countChild;
          const reps = countReply - countPostLoaded;
          const unit = countReply > 1 ? 'replies' : 'reply';
          return (
            <div className="d-flex align-items-center small text-muted cursor-pointer" onClick={() => loadMoreAct()}>
              <i className="fas fa-fw fa-caret-down"></i>
              <span className="ms-2">load {reps} {unit}</span>
            </div>
          );
        }
        case 'success':
          return (
            <div className="d-flex align-items-center small text-muted cursor-pointer" onClick={() => loadMoreAct()}>
              <i className="fas fa-fw fa-caret-down"></i>
              <span className="ms-2">load more</span>
            </div>
          );
        case 'failure':
          return (
            <div className="d-flex align-items-center small text-muted cursor-pointer" onClick={() => loadMoreAct()}>
              <i className="fas fa-fw fa-caret-down"></i>
              <span className="ms-2">try again</span>
            </div>
          );
        case 'pending':
          return (
            <div className="d-flex align-items-center small text-muted">
              <i className="fas fa-fw fa-circle-notch fa-spin"></i>
              <span className="ms-2">loading...</span>
            </div>
          );
        case 'no_more': {
          if (isHiddenList) {
            const unit = countReply > 1 ? 'replies' : 'reply';
            return (
              <div className="d-flex align-items-center small text-muted cursor-pointer" onClick={() => toggle_showHideList()}>
                <i className="fas fa-fw fa-caret-down"></i>
                <span className="ms-2">show {countReply} {unit}</span>
              </div>
            );
          } else {
            return (
              <div className="d-flex align-items-center small text-muted cursor-pointer" onClick={() => toggle_showHideList()}>
                <i className="fas fa-caret-up"></i>
                <span className="ms-2">fold up</span>
              </div>
            );
          }
        }
        default:
          break;
      }
    }
    return null;
  };

  const itemList_to_DomList = postOids?.map((postOid) => (
    <PostItem key={postOid} postOid={postOid} />
  ));

  return (
    <div className="discuss-list">
      { itemList_to_DomList?.length > 0 &&
        <div className={`mt-3 d-grid gap-3 ${isHiddenList ? 'd-none' : ''}`}>
          {itemList_to_DomList}
        </div>
      }
      { loadStatus === 'failure' &&
        <div className="mt-3 alert alert-danger">
          An exception was encountered while loading the list.
        </div>
      }
      { listDepth === 1
        ?
        <div className="mt-3 d-grid gap-2 load-more">
          <LoadMoreDom />
        </div>
        :
        <div className="mt-3 d-flex justify-content-start align-items-center load-more">
          <LoadMoreDom />
        </div>
      }
    </div>
  );
}

export default PostList;
