import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Redux from "../../redux";
import Confs from "../../confs";
import Funcs from "../../funcs";



function RelaBadges(props) {

  const { pageKeys } = props;

  const dispatch = useDispatch();
  const { params, relaKvs } = useSelector(state => state.discuss);
  const { _badges } = params;


  useEffect(() => {
    window.resizeFrameHeight();
  });


  if (!_badges.length) {
    return null;
  }
  if (!pageKeys?.length) {
    return null;
  }

  const myBadges = {};
  _badges.forEach(v => myBadges[v] = null);

  for (const pageKey of pageKeys) {
    const badge = String(pageKey).substr(0, 4);
    if (myBadges[badge] !== null) continue;
    if (!relaKvs[pageKey]) continue;
    myBadges[badge] = pageKey;
  }

  const DomLis = [];
  for (const [badge, pageKey] of Object.entries(myBadges)) {
    if (!pageKey) continue;
    const relaDoc = relaKvs[pageKey];
    switch (badge) {
      case 'btsu':
        DomLis.push(
          <a key={pageKey} className="btn btn-sm btn-small-75 btn-outline-info" href={relaDoc._https_btoto} target="_blank" rel="noreferrer">{relaDoc.info.title}</a>
        );
        break;
      case 'btep':
        DomLis.push(
          <a key={pageKey} className="btn btn-sm btn-small-75 btn-outline-info" href={relaDoc._https_btoto} target="_blank" rel="noreferrer">{relaDoc._short}</a>
        );
        break;
      default:
        break;
    }
  }

  if (!DomLis.length) {
    return null;
  }

  return (
    <div className="mt-2 discuss-badges">
      {DomLis}
    </div>
  );
}

export default RelaBadges;