/* All views need to check if the user is authenticated on mounting. (except this one)
 Auth View:
   - User can login/register through auth0.*/ 

import React, { Component } from 'react';
import api from '../api';
import logo from '../assets/home.png';

class Auth extends Component {
  
  render() {
    return (
      <div className='Auth'>
        <div className='homeSplash'>
          <img src={ logo } alt='Helo Website Logo, a winking smile'/>
          <h1>Helo</h1>
          <a href={ api.prefix + api.login }>
            <button className='button black' id='login'>
              Login/Register
            </button>
          </a>
        </div>
      </div>
    )
  }
}

export default Auth;