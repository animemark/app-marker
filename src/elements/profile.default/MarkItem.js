import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../../redux";
import Confs from "../../confs";
import Funcs from "../../funcs";

import TimeAgo from "../common/TimeAgo";
import RateStar from "../common/RateStars";
import LikeAndHate from "./LikeAndHate";
import RelaTitle from "./RelaTitle";

const _confs = window._ssconfs;

function MarkItem(props) {
  const { markOid, relaIid } = props;

  const dispatch = useDispatch();

  const { userIid, userKvs } = useSelector(state => state.users);
  const { params, mkerIid, markList: { markKvs, relaKvs } } = useSelector(state => state.profile);

  useEffect(() => {
    window.resizeFrameHeight();
  });

  if (!markOid && !relaIid) {
    console.log('??? !markOid && !relaIid');
    return null;
  }

  const mkerDoc = userKvs[mkerIid];

  let markDoc, relaDoc;

  if (markOid) {
    markDoc = markKvs[markOid];
    relaDoc = relaKvs[markDoc.pageKey];
  } else {
    relaDoc = relaKvs[relaIid];
    markDoc = markKvs[relaDoc._pageKey];
  }

  if (!markDoc && !relaDoc) {
    console.log('??? !markDoc && !relaDoc');
    return null;
  }

  const { docKind } = markDoc;
  const _confs_martus = _confs.marking.martus[docKind];

  const relaInfo = Funcs.util.get_formated_rela_infos(relaDoc);

  return (
    <div className="d-flex marking-item">

      <a href={relaInfo.https} target="_blank" rel="noreferrer">
        <img src={Funcs.util.cover_width(relaInfo.cover)} alt="" width="60" height="80" />
      </a>
      <div className="ps-3 overflow-hidden">
        <a className="fw-bold" href={relaInfo.https} target="_blank" rel="noreferrer">
          {relaInfo.title}
        </a>
        <div className="d-flex flex-wrap align-items-center">
          <span className="me-2">{_confs_martus[markDoc.martus].text}</span>
          {Boolean(markDoc.score) &&
            <RateStar score={markDoc.score} css="me-2" />
          }
          <TimeAgo time={markDoc.dateCreate} css="me-2 small text-muted" />
        </div>
        <div className="limit-html" dangerouslySetInnerHTML={{ __html: Funcs.common.format_limit_html(markDoc._comment_in_html) }}></div>
      </div>

    </div>
  );
}

export default MarkItem;
