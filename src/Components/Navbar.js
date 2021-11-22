import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

class Navbar extends Component{
  render(){
    return (
      <div id="navbar">
        <ul>
          <li>
            <a href="https://www.kaggle.com/c/siim-covid19-detection" 
             target="_blank" rel="noreferrer">SIIM COVID-19 Detection</a>
          </li>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
          <NavLink to="/contract">Contract</NavLink>
          </li>
        </ul> 
    </div>
    );
  }
}

export default Navbar;