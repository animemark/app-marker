import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Redux from "../../redux";
import Confs from "../../confs";

import MarkForm from "./MarkForm";
import MarkShow from "./MarkShow";

function Mainer() {

  const dispatch = useDispatch();

  const { editing } = useSelector(state => state.marking);
  
  useEffect(() => {
    window.resizeFrameHeight();
  });

  return (
    <div className="Mainer">
      <div className="w-100">
        {editing === true &&
          <MarkForm />
        }
        {editing === false &&
          <MarkShow />
        }
      </div>
    </div>
  );
}

export default Mainer;
