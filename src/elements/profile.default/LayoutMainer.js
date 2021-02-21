import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../../redux";
import Confs from "../../confs";

import MarkList from "./MarkList";
import PostList from "./PostList";
function Mainer() {

  const { params } = useSelector(state => state.profile);

  useEffect(() => {
    window.resizeFrameHeight();
  });

  let WhatList = null;
  switch (params.menu) {
    case Confs.profile.menus.marks.file:
      WhatList = <MarkList />
      break;
    case Confs.profile.menus.posts.file:
      WhatList = <PostList />
      break;

    default:
      WhatList = (
        <div>
          This feature is under development and will be coming soon.
        </div>
      );
      break;
  }

  return (
    <div className="Mainer">
      <div className="mt-5 w-100">
        {WhatList}
      </div>
    </div>
  );
}

export default Mainer;
