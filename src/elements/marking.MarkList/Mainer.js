import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../../redux";
import Confs from "../../confs";

import MarkList from "./MarkList";
function Mainer() {

  return (
    <div className="Mainer">
      <div className="w-100">
        <MarkList />
      </div>
    </div>
  );
}

export default Mainer;
