import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../../redux";
import Confs from "../../confs";

import PostItem from "./PostItem";
import LoadMore from "./LoadMore";

function PostList(props) {
  const { listOf, level } = props;
  const dispatch = useDispatch();

  const { params, sortBy, postKvs } = useSelector(state => state.discuss);
  const { loadStatus, postAdds, postOids, prevOid, prevPos } = useSelector(state => (state.discuss.postLis[listOf] || Confs.discuss.default_postLis_unit()));

  const replyDoc = postKvs[listOf] || null;
  //const listDepth = (replyDoc?.depth || 0) + 1;

  const autoLoad = level === 1 ? true : false;

  const [isHiddenList, set_isHiddenList] = useState(false);

  useEffect(() => {
    window.resizeFrameHeight();
  });

  useEffect(() => {
    if (autoLoad && loadStatus === "initial") {
      onClick_loadMore();
    }
  });

  const onClick_loadMore = () => {
    const data = {
      ...params,
      listOf,// listOf from the props, no from the params
      sortBy,
      prevOid,
      prevPos,
    };
    dispatch(Redux.thunks.discuss.loadList(data));
  };

  const onToggle_showHideList = () => {
    set_isHiddenList(!isHiddenList);
  };

  const ItemDomListAdds = postAdds?.map((postOid) => (
    <PostItem key={postOid} postOid={postOid} level={level}/>
  ));
  const ItemDomListOids = postOids?.map((postOid) => (
    <PostItem key={postOid} postOid={postOid} level={level} />
  ));

  return (
    <div className="discuss-list" data-level={level}>
      {ItemDomListAdds.length > 0 &&
        <div className="pt-3">
          <div className="d-grid gap-3">
            {ItemDomListAdds}
          </div>
        </div>
      }
      {ItemDomListOids.length > 0 &&
        <div className={`pt-3 ${isHiddenList ? 'd-none' : ''}`}>
          <div className="d-grid gap-3">
            {ItemDomListOids}
          </div>
        </div>
      }
      { loadStatus === 'failure' &&
        <div className="mt-3 alert alert-danger">
          An exception was encountered while loading the list.
        </div>
      }
      <LoadMore
        isMainList={level === 1 ? true : false}
        loadStatus={loadStatus}
        countLoaded={postOids.length}
        countChild={replyDoc?.countChild || 0}
        countReply={replyDoc?.countReply || 0}
        onClick_loadMore={onClick_loadMore}
        isHiddenList={isHiddenList}
        onToggle_showHideList={onToggle_showHideList}
      />
    </div>
  );
}

export default PostList;
