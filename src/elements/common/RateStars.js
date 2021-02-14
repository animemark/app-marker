import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Redux from "../../redux";
import Confs from "../../confs";

function ScoreStars(props) {

  // score => 0 ~ 10
  const { score, css } = props;

  const percent = score / 10 * 100;

  return (
    <div className={`rate-star ${css}`}>
      <span className="base">
        <i className="fas fa-fw fa-star"></i>
        <i className="fas fa-fw fa-star"></i>
        <i className="fas fa-fw fa-star"></i>
        <i className="fas fa-fw fa-star"></i>
        <i className="fas fa-fw fa-star"></i>
      </span>
      <div className="mask" style={{ width: `${percent}%`, }}>
        <span className="face">
          <i className="fas fa-fw fa-star"></i>
          <i className="fas fa-fw fa-star"></i>
          <i className="fas fa-fw fa-star"></i>
          <i className="fas fa-fw fa-star"></i>
          <i className="fas fa-fw fa-star"></i>
        </span>
      </div>
    </div>
  );
}

export default ScoreStars;