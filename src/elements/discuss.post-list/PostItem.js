import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../../redux";
import Confs from "../../confs";
import Funcs from "../../funcs";

import TimeAgo from "../common/TimeAgo";
import LikeAndHate from "./LikeAndHate";
import RelaInfo from "./RelaInfo";

import PostForm from "./PostForm";
import PostList from "./PostList";

function PostItem(props) {
  const { postOid, level } = props;
  const listOf = postOid;
  const postTo = postOid;
  const dispatch = useDispatch();
  const { userIid, userKvs } = useSelector(state => state.users);
  const { params, relaKvs, postKvs } = useSelector(state => state.discuss);

  const formVal = useSelector(state => state.discuss.formKvs[postTo]);
  const isFormShowing = formVal?.showing;

  const postDoc = postKvs?.[postOid];
  const reachMaxDepth = level >= params.maxDepth ? true : false;

  const mkerIid = postDoc?.userIid;
  const mkerDoc = userKvs?.[mkerIid];

  useEffect(() => {
    window.handleLimitHeight(postOid);
  });

  const toggle_showFormStatus = () => {
    dispatch(Redux.actions.discuss.toggle_form_showing({
      postTo
    }));
    return;
  };

  const onClick_seeMore = () => {
    const o_ctrl = document.getElementById('limit-height-ctrl-' + postOid);
    if (!o_ctrl) return;
    o_ctrl.classList.remove('contracted');
    o_ctrl.classList.add('expanded');
    window.resizeFrameHeight();
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

  let continue_text = 'continue here';
  if (postDoc.countReply === 1) {
    continue_text = `${postDoc.countReply} reply ${continue_text}`
  } else if (postDoc.countReply > 1) {
    continue_text = `${postDoc.countReply} replies ${continue_text}`;
  }

  return (
    <div data-post-oid={postOid} className="discuss-item">

      <div className="d-flex justify-content-start align-items-center discuss-head">
        <a href={Funcs.util.href_add_base(mkerDoc._upath_marker)} target="_blank" rel="noreferrer">
          <img className="avatar" src={mkerDoc._https_avatar} alt="" />
        </a>
        <div className="ms-2">
          <div>
            <a href={Funcs.util.href_add_base(mkerDoc._upath_marker)} target="_blank" rel='noreferrer'>
              {mkerDoc.info.name}
            </a>
          </div>
          <TimeAgo time={postDoc.dateCreate} css="d-inline small text-muted" />
        </div>
        <div className="ms-auto">
          <i className="d-none fas fa-ellipsis-v text-muted"></i>
        </div>
      </div>

      <RelaInfo pageKeys={postDoc.pageKeys} />

      <div className="mt-2">
        <div id={`limit-height-ctrl-${postOid}`} className="limit-height-ctrl max-300px">
          <div id={`limit-height-body-${postOid}`} className="limit-height-body">
            <div className="limit-html" dangerouslySetInnerHTML={{ __html: Funcs.common.format_limit_html(postDoc._message_in_html) }}></div>
          </div>
          <div id={`limit-height-more-${postOid}`} className="limit-height-more" onClick={onClick_seeMore}>
            See More
          </div>
        </div>
      </div>

      <div className="mt-2 d-flex align-items-center small text-muted">
        <LikeAndHate postOid={postOid} />
        <ReplyBtnDom />
      </div>

      { (reachMaxDepth === false) &&
        <div className="discuss-subs">
          <PostForm postTo={postTo} />
          <PostList listOf={listOf} level={level + 1} />
        </div>
      }

      { (reachMaxDepth === true) &&
        <div className="discuss-subs">
          <div className="mt-3 ">
            <a href={Funcs.util.href_add_base(`/post/${postOid}`)} target="_blank" rel="noreferrer">{continue_text}</a>
          </div>
        </div>
      }
    </div>
  );
}

export default PostItem;
