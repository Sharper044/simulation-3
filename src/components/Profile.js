/*All views need to check if the user is authenticated on mounting. 
Profile View
User can update their first name and last name.
  User should be able to type in an input field.
User can update their gender, hair color, eye color, hobby, birth day, birth month, birth year.
  User should be able to select from a select box.
User can click cancel to revert any un-updated changes.
User can navigate to dashboard view or search view.
User can logout.
  User should be navigated back to the Auth View when logging out.
User should see an error message that the birthday fields are required in order to update the profile.
See live example on this works.*/

import React, { Component } from 'react';

class Profile extends Component {
  render() {
    return(
      <div className='Profile'>Profile</div>
    )
  }
}
export default Profile;