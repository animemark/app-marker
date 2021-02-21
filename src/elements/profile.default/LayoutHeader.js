import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Redux from "../../redux";
import Confs from "../../confs";
import Funcs from "../../funcs";

const _confs = window._ssconfs;
const _confs_martus = _confs.marking.martus.comic;// comic from the menu

function LayoutHeader() {

  const dispatch = useDispatch();
  const { userIid, userKvs } = useSelector(state => state.users);
  const { params, mkerIid } = useSelector(state => state.profile);

  const mkerDoc = userKvs[mkerIid];
  const mkerUni = mkerDoc.info.uniq;

  useEffect(() => {
    window.resizeFrameHeight();
  });

  const MainMenuDomLis = [];
  for (const [file, item] of Object.entries(Confs.profile.menus)) {
    MainMenuDomLis.push((
      <a key={file} className={`nav-link ${file === params.menu ? 'active' : ''}`} href={Funcs.util.href_add_base(`/marker/${mkerUni}/${file}`)}>{item.text}</a>
    ));
  }

  const SubsMenuDomLis = [];
  switch (params.menu) {
    case Confs.profile.menus.marks.file:
      SubsMenuDomLis.push((
        <a key="all" className={`nav-link ${null === params.martus ? 'active' : ''}`} href={Funcs.util.href_add_base(`/marker/${mkerUni}/${params.menu}`)}>All</a>
      ));
      for (const [file, item] of Object.entries(_confs_martus)) {
        SubsMenuDomLis.push((
          <a key={file} className={`nav-link ${file === params.martus ? 'active' : ''}`} href={Funcs.util.href_add_base(`/marker/${mkerUni}/${params.menu}/${file}`)}>{item.text}</a>
        ));
      }
      break;

    case Confs.profile.menus.posts.file:
      break;

    case Confs.profile.menus.files.file:
      // const dis_subs = {
      //   topics: 'My topics',
      //   replies: 'My replies',
      //   replied: 'Replies received',
      // };
      // for (const [file, text] of Object.entries(dis_subs)) {
      //   SubsMenuDomLis.push((
      //     <a key={file} className={`nav-link ${file === params.postType ? 'active' : ''}`} href={Funcs.util.href_add_base(`/marker/${mkerUni}/${params.menu}/${file}`)}>{text}</a>
      //   ));
      // }
      break;
    default:
      break;
  }

  return (
    <header className="header">
      <div className="pt-5">
      </div>
      <div className="d-flex flex-column align-items-center">
        <img className="shadow-2 avatar-1000" src={mkerDoc._https_avatar} alt="avatar" />
        <h3 className="mt-3">{mkerDoc.info.name}</h3>
        <span>UserID: #{mkerIid}</span>
        <span>Joined: {moment(mkerDoc.base.dateCreate).format('YYYY-MM-DD')}</span>
      </div>
      <div className="mt-4 overflow-hidden">
        <div className="limit-html" dangerouslySetInnerHTML={{ __html: Funcs.common.format_limit_html(mkerDoc._userDetailDoc._biography_in_html) }}>
        </div>
      </div>
      <nav className="mt-5 nav justify-content-center main">
        {MainMenuDomLis}
      </nav>
      {SubsMenuDomLis.length > 0 &&
        <div className="mt-3 px-3 text-center">
          <nav className="nav d-inline-flex justify-content-center subs">
            {SubsMenuDomLis}
          </nav>
        </div>
      }
    </header>
  );
}

export default LayoutHeader;