import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../../redux";
import Confs from "../../confs";
import Funcs from "../../funcs";

import TimeAgo from "../common/TimeAgo";
import RateStar from "../common/RateStars";

const _confs = window._ssconfs;

function PostItem(props) {
  const { postOid } = props;

  const { userKvs } = useSelector(state => state.users);
  const { mkerIid, postList: { postKvs } } = useSelector(state => state.profile);

  useEffect(() => {
    window.resizeFrameHeight();
  });

  if (!postOid) {
    console.log('??? !postOid');
    return null;
  }

  const mkerDoc = userKvs[mkerIid];
  const postDoc = postKvs[postOid];

  if (!postDoc) {
    console.log('??? !postDoc');
    return null;
  }


  const aPostOid = postOid;
  const aPostDoc = postDoc;
  const aMkerIid = mkerIid;
  const aMkerDoc = mkerDoc;

  /**
   * reply to
   */
  let bPostOid = null;
  let bPostDoc = null;
  let bMkerIid = null;
  let bMkerDoc = null;

  if (postDoc.userIid !== mkerIid) {
    bPostOid = aPostDoc.replyTo;
    bPostDoc = postKvs[bPostOid];
    bMkerIid = aPostDoc.userIid;
    bMkerDoc = userKvs[bMkerIid];
  } else if (aPostDoc.replyTo) {
    bPostOid = aPostDoc.replyTo;
    bPostDoc = postKvs[bPostOid];
    bMkerIid = bPostDoc.userIid;
    bMkerDoc = userKvs[bMkerIid];
  }

  const TitleDom = () => {
    // received reply from b
    if (postDoc.userIid !== mkerIid) {
      return (
        <div className="d-flex">
          <a href={Funcs.util.href_add_base(aMkerDoc._upath_marker)} target="_blank" rel="noreferrer">{aMkerDoc.info.name}</a>
          <span className="mx-2">received reply from</span>
          <a href={Funcs.util.href_add_base(bMkerDoc._upath_marker)} target="_blank" rel="noreferrer">{bMkerDoc.info.name}</a>
        </div>
      );
    }

    // replied to b
    if (postDoc.replyTo) {
      return (
        <div className="d-flex">
          <a href={Funcs.util.href_add_base(aMkerDoc._upath_marker)} target="_blank" rel="noreferrer">{aMkerDoc.info.name}</a>
          <span className="mx-2">replied to</span>
          <a href={Funcs.util.href_add_base(bMkerDoc._upath_marker)} target="_blank" rel="noreferrer">{bMkerDoc.info.name}</a>
        </div>
      );
    }

    // new topic
    return (
      <div className="d-flex">
        <a href={Funcs.util.href_add_base(aMkerDoc._upath_marker)} target="_blank" rel="noreferrer">{aMkerDoc.info.name}</a>
        <span className="ms-2">started a new topic</span>
      </div>
    );
  };

  const MessageDom = () => {
    // received reply from b
    if (postDoc.userIid !== mkerIid) {
      return (
        <>
          <div className="mt-2">
            <i className="fas fa-comment-dots"></i>
            <span className="ms-2 fw-bold">{aMkerDoc.info.name}</span>
          </div>
          <div className="limit-html" dangerouslySetInnerHTML={{ __html: Funcs.common.format_limit_html(aPostDoc._message_in_html) }}></div>
          <div>
            <a href={Funcs.util.href_add_base(`/post/${aPostDoc._id}`)} target="_blank" rel="noreferrer">permalink</a>
          </div>

          <div className="mt-2">
            <i className="fas fa-reply"></i>
            <span className="ms-2 fw-bold">{bMkerDoc.info.name}</span>
          </div>
          <div className="limit-html" dangerouslySetInnerHTML={{ __html: Funcs.common.format_limit_html(bPostDoc._message_in_html) }}></div>
          <div>
            <a href={Funcs.util.href_add_base(`/post/${bPostDoc._id}`)} target="_blank" rel="noreferrer">permalink</a>
          </div>
        </>
      );
    }

    // replied to b
    if (postDoc.replyTo) {
      return (
        <>
          <div className="mt-2">
            <i className="fas fa-comment-dots"></i>
            <span className="ms-2 fw-bold">{bMkerDoc.info.name}</span>
          </div>
          <div className="limit-html" dangerouslySetInnerHTML={{ __html: Funcs.common.format_limit_html(bPostDoc._message_in_html) }}></div>
          <div>
            <a href={Funcs.util.href_add_base(`/post/${bPostDoc._id}`)} target="_blank" rel="noreferrer">permalink</a>
          </div>

          <div className="mt-2">
            <i className="fas fa-reply"></i>
            <span className="ms-2 fw-bold">{aMkerDoc.info.name}</span>
          </div>
          <div className="limit-html" dangerouslySetInnerHTML={{ __html: Funcs.common.format_limit_html(aPostDoc._message_in_html) }}></div>
          <div>
            <a href={Funcs.util.href_add_base(`/post/${aPostDoc._id}`)} target="_blank" rel="noreferrer">permalink</a>
          </div>
        </>
      );
    }

    // new topic
    return (
      <>
        <div className="mt-2">
          <i className="fas fa-comment-dots"></i>
          <span className="ms-2 fw-bold">{aMkerDoc.info.name}</span>
        </div>
        <div className="limit-html" dangerouslySetInnerHTML={{ __html: Funcs.common.format_limit_html(aPostDoc._message_in_html) }}></div>
        <div>
          <a href={Funcs.util.href_add_base(`/post/${aPostDoc._id}`)} target="_blank" rel="noreferrer">permalink</a>
        </div>
      </>
    );
  };

  return (
    <div className="d-block overflow-hidden posting-item">
      <div className="d-flex">
        <span className="me-2 d-flex align-items-center badge bg-dark text-white">
          <TimeAgo time={postDoc.dateCreate} css="" />
        </span>
        <TitleDom />
      </div>
      <MessageDom />
    </div>
  );
}

export default PostItem;

/**
 * [Post By mker]
 * 1 hour ago UserA started a new topic
 * {UserA message}
 * { page info }
 *
 * 10 hours ago UserA replied to UserB
 * {UserB message}
 * {UserA message}
 * { post info }
 *
 * [Reply To mker]
 * 10 days ago UserA received a reply from UserB
 * {UserA message}
 * {UserB message}
 * { post info }
 */
