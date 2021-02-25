import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Redux from "../../redux";
import Confs from "../../confs";
import Funcs from "../../funcs";

const _confs = window._ssconfs;

function EditFiles(props) {

  const { files } = props;

  useEffect(() => {
    window.resizeFrameHeight();
  });

  if (!Object.keys(files).length) {
    return null;
  }

  const FilesDom = [];
  for (const [finc, file] of Object.entries(files)) {
    switch (file.what) {
      case 'success':
        const furl = `${_confs.domain.file_attachs_api_prefix}${file.data}`;
        FilesDom.push((
          <div key={finc} className="file-holder success">
            <a href={furl} target="_blank" rel="noreferrer">
              <img src={furl} alt={furl} />
            </a>
          </div>
        ));
        break;

      case 'failure':
        FilesDom.push((
          <div key={finc} className="file-holder failure">
            <i className="fas fa-exclamation-circle text-danger"></i>
          </div>
        ));
        break;

      case 'pending':
      default:
        FilesDom.push((
          <div key={finc} className="file-holder pending">
            <i className="fas fa-circle-notch fa-spin"></i>
          </div>
        ));
        break;
    }
  }

  return (
    <div className="uploadFiles">
      <div className="d-flex">
        {FilesDom}
      </div>
    </div>
  );
}

export default EditFiles;