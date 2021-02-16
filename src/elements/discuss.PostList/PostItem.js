import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../../redux";
import Confs from "../../confs";
import Funcs from "../../funcs";

import TimeAgo from "../common/TimeAgo";

import PostForm from "./PostForm";
import PostList from "./PostList";

import LikeAndHate from "./LikeAndHate";


function PostItem(props) {
  const { postOid } = props;
  const listAt = postOid;
  const postTo = postOid;
  const dispatch = useDispatch();
  const { userIid, userKvs } = useSelector(state => state.users);
  const { badges, relaKvs, postKvs } = useSelector(state => state.discuss);

  const formVal = useSelector(state => state.discuss.formKvs[postTo]);
  const isFormInited = formVal ? true : false;
  const isFormShowing = formVal?.showing;

  const postDoc = postKvs?.[postOid];
  const postDepth = postDoc?.depth;

  const reachMaxDepth = postDepth >= Confs.discuss.maxDepth ? true : false;

  const poerIid = postDoc?.userIid;
  const poerDoc = userKvs?.[poerIid];

  useEffect(() => {
    window.resizeFrameHeight();
  });

  const toggle_showFormStatus = () => {
    if (!isFormInited) {
      dispatch(Redux.actions.discuss.init_form(postTo));
      return;
    }
    dispatch(Redux.actions.discuss.set_form_showing({
      postTo,
      showing: !isFormShowing,
    }));
    return;
  };

  const ReplyBtnDom = () => {
    if (reachMaxDepth || !userIid) return null;
    return (
      <button
        className={`ms-3 btn btn-sm ${isFormShowing ? 'btn-secondary' : 'btn-link'} text-decoration-none cursor-pointer`}
        onClick={() => toggle_showFormStatus()}>
        Reply
      </button>
    )
  }

  const BadgesDom = () => {
    if (postDepth > 1) {
      return null;
    }
    if (!badges?.length) {
      return null;
    }
    if (!postDoc?.pageKeys?.length) {
      return null;
    }

    const myBadges = {};
    badges.forEach(v => myBadges[v] = null);

    for (const pageKey of postDoc.pageKeys) {
      const badge = String(pageKey).substr(0, 4);
      if (myBadges[badge] !== null) continue;
      if (!relaKvs[pageKey]) continue;
      myBadges[badge] = pageKey;
    }

    const DomArr = [];
    for (const [badge, pageKey] of Object.entries(myBadges)) {
      if (!pageKey) continue;
      const relaDoc = relaKvs[pageKey];
      switch (badge) {
        case 'btsu':
          DomArr.push(
            <a key={pageKey} className="btn btn-sm btn-outline-info" href={relaDoc._https_btoto} target="_blank" rel="noreferrer">{relaDoc.info.title}</a>
          );
          break;
        case 'btep':
          DomArr.push(
            <a key={pageKey} className="btn btn-sm btn-outline-info" href={relaDoc._https_btoto} target="_blank" rel="noreferrer">{relaDoc._short}</a>
          );
          break;
        default:
          break;
      }
    }

    if (!DomArr.length) {
      return null;
    }

    return (
      <div className="mt-2 discuss-badges">
        {DomArr}
      </div>
    );
  };

  return (
    <div className="discuss-item lv1">
      <div className="d-flex justify-content-start align-items-center discuss-head">
        <a href={poerDoc._https_btoto} target="_blank" rel="noreferrer">
          <img className="avatar" src={poerDoc._https_avatar} alt="" />
        </a>
        <div className="ms-2">
          <div>
            <a href={poerDoc._https_btoto} target="_blank" rel='noreferrer'>
              {poerDoc.info.name}
            </a>
          </div>
          <TimeAgo time={postDoc.dateCreate} css="d-inline small text-muted" />
        </div>
        <div className="ms-auto">
          <i className="d-none fas fa-ellipsis-v text-muted"></i>
        </div>
      </div>
      <BadgesDom />
      <div className="mt-2">
        <div className="limit-html" dangerouslySetInnerHTML={{ __html: Funcs.common.format_limit_html(postDoc._message_in_html) }}></div>
      </div>
      <div className="mt-2 d-flex align-items-center small text-muted">
        <LikeAndHate postOid={postOid} />
        <ReplyBtnDom />
      </div>
      { isFormInited &&
        <div className={`mt-2 discuss-indent ${isFormShowing ? '' : 'd-none'}`}>
          <PostForm postTo={postTo} />
        </div>
      }
      { (reachMaxDepth === false) &&
        <div className="mt-2 discuss-subs">
          <PostList listAt={listAt} />
        </div>
      }
    </div>
  );
}

export default PostItem;
