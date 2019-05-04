import React from 'react';
import { FaPlus, FaTint, FaBars } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Dropdown from '../Dropdown/Dropdown';
import './Nav.css';
import MobileDropdown from '../MobileDropdown/MobileDropdown';

const Nav = (props) => (
  <div className="nav">

      <Dropdown user={props.user.id}/>
      <MobileDropdown user={props.user.id} />
    
    <div className="nav-right">
      <Link className="nav-link" to="/addPlant">
        {props.user.id ? <div><FaPlus /> Add Plant </div> : null}
      </Link>
      <Link className="nav-link" to="/allPlants">
        
        {props.user.id ? <div><FaBars /> Plant Inventory</div> : null}
      </Link>
      <Link className="nav-link" to="/home">

        {props.user.id ? <div><div><FaTint />Dashboard</div> </div> : null}
      </Link>
      
      <Link className="nav-link" to="/home">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? null : 'Login / Register'}
      </Link>
      <Link className="nav-link" to="/about">
        {/* Show this link if they are logged in or not,
        but call this link 'Home' if they are logged in,
        and call this link 'Login / Register' if they are not */}
        {props.user.id ? null : 'About'}
      </Link>
    </div>
  </div>
);

// Instead of taking everything from state, we just want the user
// object to determine if they are logged in
// if they are logged in, we show them a few more links 
// if you wanted you could write this code like this:
// const mapStateToProps = ({ user }) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(Nav);
