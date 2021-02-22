import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Redux from "../../redux";
import Confs from "../../confs";
import Funcs from "../../funcs";

const _confs = window._ssconfs;
const _pks = _confs.common.pageKeys;

function RelaInfo(props) {

  const {
    pageKeys,
    itemCss = 'me-2 btn btn-sm btn-small-75 btn-outline-info',
  } = props;

  const dispatch = useDispatch();
  const { params, relaKvs } = useSelector(state => state.discuss);
  const { showAllRela, _showRelaKeys } = params;

  useEffect(() => {
    window.resizeFrameHeight();
  });


  if (!_showRelaKeys.length && !showAllRela) {
    return null;
  }
  if (!pageKeys?.length) {
    return null;
  }

  /**
   * the rela data we want to show
   * rela_keyType_to_pageKey = {
   *  btsu: null,
   *  btep: null,
   * };
   * =>
   * rela_keyType_to_pageKey = {
   *  btsu: btsu1024,
   *  btep: btep2048,
   * };
   */
  const rela_keyType_to_pageKey = {};

  // keep the order as gaven
  if (_showRelaKeys.length) {
    _showRelaKeys.forEach(v => rela_keyType_to_pageKey[v] = null);
  }

  for (const pageKey of pageKeys) {
    const keyType = String(pageKey).substr(0, 4);

    if (showAllRela) {
      // add every rela page
    } else {
      if (rela_keyType_to_pageKey[keyType] !== null) {
        continue;
      }
    }

    if (!relaKvs[pageKey]) continue;
    rela_keyType_to_pageKey[keyType] = pageKey;
  }

  const DomLis = [];
  for (const [keyType, pageKey] of Object.entries(rela_keyType_to_pageKey)) {
    if (!pageKey) continue;
    const relaDoc = relaKvs[pageKey];
    const relaInfo = Funcs.util.get_formated_rela_infos(relaDoc);
    DomLis.push(
      <a key={pageKey} className={itemCss} href={relaInfo.https} target="_blank" rel="noreferrer">{relaInfo.title}</a>
    );
  }

  if (!DomLis.length) {
    return null;
  }

  return (
    <div className="mt-2">
      {DomLis}
    </div>
  );
}

export default RelaInfo;