import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Redux from "../../redux";
import Confs from "../../confs";
import Funcs from "../../funcs";

import TimeAgo from "../common/TimeAgo";
import LikeAndHate from "./LikeAndHate";
import RelaInfo from "./RelaInfo";

function NodeInfo() {

  const dispatch = useDispatch();
  const { userKvs } = useSelector(state => state.users);
  const { params, postKvs } = useSelector(state => state.discuss);

  useEffect(() => {
    window.resizeFrameHeight();
  });

  const {
    listOf: postOid,
    showNodeInfo = false,
  } = params;

  if (!showNodeInfo) return null;

  const postDoc = postKvs[postOid];

  if (!postOid || !postDoc) return null;

  const { userIid: mkerIid } = postDoc;
  const mkerDoc = userKvs[mkerIid];

  if (!mkerIid || !mkerDoc) return null;

  const pageKeys = postDoc.rootKeys || postDoc.pageKeys;

  return (
    <div className="p-3 mb-3 discuss-node" >
      { pageKeys?.length >= 1 &&
        <>
          <RelaInfo pageKeys={pageKeys} itemCss="me-3" />
          <hr />
        </>
      }
      <div data-post-oid={postOid} className="discuss-item">
        <div className="d-flex justify-content-start align-items-center discuss-head">
          <a href={mkerDoc._https_btoto} target="_blank" rel="noreferrer">
            <img className="avatar" src={mkerDoc._https_avatar} alt="" />
          </a>
          <div className="ms-2">
            <div>
              <a href={mkerDoc._https_btoto} target="_blank" rel='noreferrer'>
                {mkerDoc.info.name}
              </a>
            </div>
            <TimeAgo time={postDoc.dateCreate} css="d-inline small text-muted" />
          </div>
          <div className="ms-auto">
            <i className="d-none fas fa-ellipsis-v text-muted"></i>
          </div>
        </div>

        <div className="mt-2">
          <div className="limit-html" dangerouslySetInnerHTML={{ __html: Funcs.common.format_limit_html(postDoc._message_in_html) }}></div>
        </div>

        <div className="mt-2 d-flex align-items-center small text-muted">
          <LikeAndHate postOid={postOid} />
        </div>
      </div>
    </div>
  );
}

export default NodeInfo;