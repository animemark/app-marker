import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Redux from '../redux';

function Header() {
  return (
    <header className="header">
      <div className="w-100">
        <div className="alert alert-secondary">This is a comment system developed by ourselves, <s className="limit-html-spoiler">Not Disqus</s>, still in the Alpha version, only has simple functions and may have bugs, but will be gradually improve.</div>
      </div>
    </header>
  );
}

export default Header;