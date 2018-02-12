/* All views need to check if the user is authenticated on mounting. 
Search View
User can navigate to dashboard view or search view.
User can logout.
  User should be navigated back to the Auth View when logging out.
User should see a list of friends / people to add as friends.
  The container for these users should limit to 24.
  Pagination should be used to navigate between pages of users.
User can apply a filter by first or last name.
User can reset an applied filter to get the entire list of users again.*/

import React, { Component } from 'react';

class Search extends Component {
  render() {
    return (
      <div className='Search'>Search</div>
    )
  }
}
export default Search;