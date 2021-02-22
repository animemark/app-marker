import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../../redux";
import Confs from "../../confs";

import NodeInfo from "./NodeInfo";
import PostList from "./PostList";
import PostForm from "./PostForm";
import SortByBar from "./SortByBar";

function Mainer() {

  const dispatch = useDispatch();
  const { params } = useSelector(state => state.discuss);
  const { listOf, postTo } = params;

  return (
    <div className="Mainer">
      <div className="w-100">
        <NodeInfo />
        <PostForm postTo={postTo} isRoot={true}/>
        <SortByBar />
        <PostList listOf={listOf} level={1} />
      </div>
    </div>
  );
}

export default Mainer;
