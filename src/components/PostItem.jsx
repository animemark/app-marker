import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../redux";
import Confs from "../confs";

import PostForm from "./PostForm";
import PostList from "./PostList";

import LikeAndHate from "./LikeAndHate";
import TimeAgo from "./TimeAgo";

function PostItem(props) {
  const { postOid } = props;
  const listAt = postOid;
  const postTo = postOid;
  const dispatch = useDispatch();
  const { userIid, userKvs } = useSelector(state => state.users);
  const { badges, pageKvs, postKvs } = useSelector(state => state.discuss);

  const formVal = useSelector(state => state.discuss.formKvs[postTo]);
  const isFormInited = formVal ? true : false;
  const isFormShowing = formVal?.showing;

  const postDoc = postKvs?.[postOid];
  const postDepth = postDoc?.depth;

  const reachMaxDepth = postDepth >= Confs.maxDepth ? true : false;

  const poerIid = postDoc?.userIid;
  const poerDoc = userKvs?.[poerIid];

  useEffect(() => {
    window.resizeFrameHeight('PostItem');
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

  const message_in_html = () => {
    const str_onload = `onload="if(window.callback_limit_html_img_onload){window.callback_limit_html_img_onload(this)}"`;
    const str_onerror = `onerror="if(window.callback_limit_html_img_onerror){window.callback_limit_html_img_onerror(this)}"`;
    const message_in_html = String(postDoc._message_in_html || '')
      .replace(/<img\ssrc="([^"]+)"\sclass="limit-html-img"/ig, `<img src="$1" ${str_onload} ${str_onerror} class="limit-html-img"`);
    return message_in_html;
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
    if (!postDoc?.ideKeys?.length) {
      return null;
    }

    const myBadges = {};
    badges.forEach(v => myBadges[v] = null);

    for (const ideKey of postDoc.ideKeys) {
      const badge = String(ideKey).substr(0, 4);
      if (myBadges[badge] !== null) continue;
      if (!pageKvs[ideKey]) continue;
      myBadges[badge] = ideKey;
    }

    const DomArr = [];
    for (const [badge, ideKey] of Object.entries(myBadges)) {
      if (!ideKey) continue;
      const pageDoc = pageKvs[ideKey];
      switch (badge) {
        case 'btsu':
          DomArr.push(
            <a key={ideKey} className="btn btn-sm btn-outline-info" href={pageDoc._https_btoto} target="_blank" rel="noreferrer">{pageDoc.info.title}</a>
          );
          break;
        case 'btep':
          DomArr.push(
            <a key={ideKey} className="btn btn-sm btn-outline-info" href={pageDoc._https_btoto} target="_blank" rel="noreferrer">{pageDoc._short}</a>
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
      <div className="mt-2" dangerouslySetInnerHTML={{ __html: message_in_html() }}></div>
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
