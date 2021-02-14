import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../../redux";
import Confs from "../../confs";

import SortByBar from "./SortByBar";

import MarkList from "./MarkList";
function Mainer() {

  useEffect(() => {
    window.resizeFrameHeight();
  });
  
  return (
    <div className="Mainer">
      <div className="w-100">
        <SortByBar />
        <MarkList />
      </div>
    </div>
  );
}

export default Mainer;
