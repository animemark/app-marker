import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Redux from "../../redux";
import Confs from "../../confs";
import Funcs from "../../funcs";

function RelaTitle(props) {

  const { markOid } = props;
  const { markKvs, relaKvs } = useSelector(state => state.marking);
  const markDoc = markKvs?.[markOid];


  if (!markDoc) {
    return null;
  }
  const relaDoc = relaKvs[markDoc.pageKey];

  if (!relaDoc) {
    return null;
  }

  const relaInfo = Funcs.util.get_formated_rela_infos(relaDoc);

  return (
    <a className="btn btn-sm btn-dark" href={relaInfo.https} target="_blank" rel="noreferrer">
      <i className="fas fa-book"></i>
      <span className="ms-2">{relaInfo.title}</span>
    </a>
  );
}

export default RelaTitle;