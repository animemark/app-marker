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
  const isFormInited = formVal ? true : false;
  const isFormShowing = formVal?.showing;

  const postDoc = postKvs?.[postOid];
  const postDepth = postDoc?.depth;

  const reachMaxDepth = level >= params.maxDepth ? true : false;

  const mkerIid = postDoc?.userIid;
  const mkerDoc = userKvs?.[mkerIid];

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
        <div className="discuss-subs">
          <PostList listOf={listOf} level={level + 1} />
        </div>
      }

    </div>
  );
}

export default PostItem;
