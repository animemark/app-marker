import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../../redux";
import Confs from "../../confs";
import Funcs from "../../funcs";

import TimeAgo from "../common/TimeAgo";
import RateStar from "../common/RateStars";
import LikeAndHate from "./LikeAndHate";

function MarkItem(props) {
  const { markOid } = props;
  const dispatch = useDispatch();

  const { ssconfs } = useSelector(state => state.ssconfs);
  const { userIid, userKvs } = useSelector(state => state.users);
  const { badges, markKvs } = useSelector(state => state.marking);

  useEffect(() => {
    window.resizeFrameHeight();
  });

  const markDoc = markKvs?.[markOid];
  const mkerIid = markDoc?.userIid;
  const mkerDoc = userKvs?.[mkerIid];

  if (!markDoc) {
    return null;
  }

  const { _docKind } = markDoc;
  const _confs_martus = ssconfs.martus[_docKind];

  return (
    <div className="discuss-item lv1">
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
          <div className="d-flex">
            <div>{_confs_martus[markDoc.martus].text}</div>
            {Boolean(markDoc.score) &&
              <RateStar score={markDoc.score} css="ms-2" />
            }
          </div>
        </div>
        <div className="ms-auto">
          <i className="d-none fas fa-ellipsis-v text-muted"></i>
        </div>
      </div>
      <div className="mt-2" dangerouslySetInnerHTML={{ __html: Funcs.common.format_limit_html(markDoc._comment_in_html) }}></div>
      <div className="mt-2 d-flex justify-content-between align-items-center small text-muted">
        <TimeAgo time={markDoc.dateCreate} css="d-inline small text-muted" />
        <LikeAndHate markOid={markOid} />
      </div>
    </div>
  );
}

export default MarkItem;
