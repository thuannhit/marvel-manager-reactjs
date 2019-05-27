import React from 'react';
import logo from './logo.svg';
import './style.css';

const Header = () => (
  <header className="Header">
    <h1 className="Header-title">Marvel Manager in ReactJS</h1>
    <div className="MarvelBrand">
      <img src={logo} className="img-responsive center-block MarvelBrand-logo" alt="Marvel logo" />
      <small>Made in Thuan Nguyen's room</small>
    </div>
  </header>
);

export default Header;
