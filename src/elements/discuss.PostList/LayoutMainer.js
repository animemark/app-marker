import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../../redux";
import Confs from "../../confs";

import PostList from "./PostList";
import PostForm from "./PostForm";
import SortByBar from "./SortByBar";

function Mainer() {

  const dispatch = useDispatch();
  const { listAt, postTo } = useSelector(state => state.discuss);
  const formVal = useSelector(state => state.discuss.formKvs[postTo]);
  const isFormInited = formVal ? true : false;

  useEffect(() => {
    if (!isFormInited) {
      dispatch(Redux.actions.discuss.init_form(postTo));
    }
  });

  return (
    <div className="Mainer">
      <div className="w-100">
        {(isFormInited) &&
          <PostForm postTo={postTo} />
        }
        <SortByBar />
        <PostList listAt={listAt} />
      </div>
    </div>
  );
}

export default Mainer;
