import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Redux from "../../redux";
import Confs from "../../confs";

function EditErrors(props) {
  const { errorNo } = props;

  if (!errorNo) return null;
  switch (errorNo) {
    case 1001:
      return (
        <div className="alert alert-danger error">
          Comments can't be blank.
        </div>
      );
    case Confs.eno.LoginRequired:
      return (
        <div className="alert alert-danger error">
          It looks like you have not logged in yet?
        </div>
      );
    default:
      return (
        <div className="alert alert-danger error">
          Unknown error, please try again.
        </div>
      );
  }
}

export default EditErrors;