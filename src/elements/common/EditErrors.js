import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Redux from "../../redux";
import Confs from "../../confs";

function EditErrors(props) {
  const { errors } = props;

  const ItemDoms = errors.map(error => (
    <div key={error.ekey} className="errorItem">{error.text}</div>
  ));

  if (!ItemDoms?.length) return null;

  return (
    <div className="errorList">
      {ItemDoms}
    </div>
  );
}

export default EditErrors;