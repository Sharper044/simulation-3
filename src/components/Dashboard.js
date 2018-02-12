/* All views need to check if the user is authenticated on mounting. 
Dashboard View
  - User can navigate to search view or profile view from this view.
  - User can see recommended friends based on profile attributes.
    - The container for recommended friends should have overflow for scrolling large results.
  - User should not appear in the recommended friends area.
  - User can logout.
    - User should be navigated back to the Auth View when logging out.*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getUserInfo } from '../ducks/reducer';
import { Link } from 'react-router-dom';
import api from '../api';
import axios from 'axios';

class Dashboard extends Component {
  constructor( props ) {
    super( props );

    this.state = {
      friends: {}
    }
  }

  componentDidMount() {
    this.props.getUserInfo()
      .then( () => {
      axios.post( '/api/recommended', { category: 'first_name', pageNum: 1 } ).then( res => this.setState({ friends: res.data })
      )
    }).catch(console.log);
  }

  render() {
    return(
      <div className='Dashboard'>Dashboard</div>
    )
  }
}

function mapStateToProps( state ) {
  return {
    user: state.user
  }
}

export default connect( mapStateToProps, { getUserInfo })( Dashboard );