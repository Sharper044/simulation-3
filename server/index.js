/*The back-end should be created using express.
Massive should be used to establish a connection to your database.
Express.static should be used to serve your production-ready front-end files.
Express sessions should be used to keep track of logged in users.
Passport should be used with passport sessions.
In passport's serializeUser method:
Take the user's id, first name, and last name.
If there is no first or last name, default them with empty strings ''.
Add another property called picture and use https://robohash.org/me as its value. This will give new users a robot picture.
In passport's deserializeUser method:
Add the user to the database if they don't exist already.*/


require('dotenv').config();

const express = require('express')
    , bodyParser = require('body-parser')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , session = require('express-session');

const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../build'));

massive(process.env.CONNECTION_STRING).then( db => {
  app.set('db', db);
});



passport.use(new Auth0Strategy({
  domain: process.env.AUTH_DOMAIN,
  clientID: process.env.AUTH_CLIENT_ID,
  clientSecret: process.env.AUTH_CILIENT_SECRET,
  callbackURL: process.env.AUTH_CALLBACK
}, function( accessToken, refreshToken, extraParams, profile, done ) {

  const db = app.get('db');

  db.find_user([ profile.id ])
    .then( user => {
      if ( user[0] ) {
        return done( null, { id: user[0]['user_id'] });
      }
      else {
        db.create_user([ profile.id , profile.given_name, profile.family_name ])
          .then( user => {
            return done( null, { id: user[0]['user_id'] })
          })
          .catch(console.log);
      }
    })
    .catch(console.log);
}));
passport.serializeUser( ( user, done ) => {
  done( null, user )
});

passport.deserializeUser( ( user, done ) => {
  
  const db = app.get('db');

  db.find_session_user([user.id])
    .then( user => {
      console.log(user[0])
      done( null, user[0] )})
    .catch(console.log);

});

/*Authorization Endpoints
GET - /api/auth/login - Invokes the authenticate method on passport.
Should redirect to /api/auth/setUser on success.
Should redirect to /api/auth/login on failure.
GET - /api/auth/setUser - Sets the user information on the session.
The endpoint should then redirect the user back to the dashboard view.
GET - /api/auth/authenticated - Checks for the user object on session.
Sends a status of 200 and the user object if it is on session.
Sends a status of 403 if it is not on session.
POST - /api/auth/logout - Destroys the session and sends a status of 200.*/

app.get('/api/auth/login', passport.authenticate('auth0', {
  //successRedirect: 'http://localhost:3000/#/Dashboard',
  successRedirect: '/api/auth/setUser',
  failureRedirect: 'http://localhost:3000/#/'
}));

app.get('/api/auth/setUser', function( req, res, next ){
  if( !req.session.user ){
    req.session.user = req.user;
  }
  return res.redirect('http://localhost:3000/#/Dashboard');
});

app.get('/api/auth/authenticated', ( req, res, next ) => {
  console.log(req.session)
  console.log('hi', req.user);
  if ( !req.user ) {
    return res.status(403).send('Please log in');
  }
  else {
    return res.status(200).send( req.user );
  }
});

app.post('/api/auth/logout', (req, res) => {
  req.logOut();
  return res.redirect('http://localhost:3000/#/');
});

/*Friend Endpoints
GET - /api/friend/list - Lists all friends of the logged in user.
Sends a status of 200 and a list of user IDs that are friends of the logged in user.
POST - /api/friend/add - Adds a friend to the logged in user's friend list.
Sends a status of 200 with the updated list of user IDs that are friends of the logged in user.
POST - /api/friend/remove - Removes a friend from the logged in user's friend list.
Sends a status of 200 with the updated list of user IDs that are friends of the logged in user.*/

app.get('/api/friend/list', ( req, res, next ) => {

  const db = app.get('db');

  db.get_all_friends([ req.user.user_id ])
    .then( friends => res.status(200).send( friends ))
    .catch(console.log);
});

app.post('/api/friend/add', ( req, res, next ) => {

  const db = app.get('db');

  db.add_friend([ req.user.user_id, req.body.friend_id ])
    .then( friends => res.status(200).send( friends ))
    .catch(console.log);
});

app.post('/api/friend/remove', ( req, res, next ) => {

  const db = app.get('db');

  db.unfriend([ req.user.user_id, req.body.friend_id ])
    .then( friends => res.status(200).send( friends ))
    .catch(console.log);
});

/*User Endpoints
PUT - /api/user/patch/:id - Updates a user's attribute(s).
Sends a status of 200 and the updated user object.
GET - /api/user/list - Returns a list of 24 users.
This endpoint should count how many users there are, not including the logged in user.
This endpoint should calculate how many available pages there are for pagination.
Hint: Total user count. 24 users per page.
This endpoint should handle the pagination of users.
Hint: Query offsets and limits.
Sends a status of 200 with the user count, number of pagination pages, and 24 user objects.
GET - /api/user/search - Return all users that meet the search criteria.
Sends a status of 200 and all the users that meet the criteria.*/

app.put('/api/user/patch/:id', ( req, res, next ) => {

  const db = app.get('db');

  db.update_user([ req.params.id, req.body.first_name, req.body.last_name, req.body.gender, req.body.hair_color, req.body.eye_color, req.body.hobby, req.body.birthday_day, req.body.birthday_month, req.body.birthday_year])
    .then( user => res.status(200).send( user ))
    .catch(console.log)
});

app.get('/api/user/list', ( req, res, next ) => {

  const db = app.get('db');

  db.user_page_total([req.body.pageNum])
    .then( totals => {
      db.current_page_users([ req.user.user_id, req.body.pageNum ])
        .then( userData => {
          let data = {
            totals,
            userData
          }
          res.status(200).send( data )
        })
        .catch(console.log)
      })
    .catch(console.log)
});

app.get('/api/user/search', ( req, res, next ) => {

  const db = app.get('db');

  db.search([ req.user.user_id, req.body.category, req.body.value, req.body.pageNum ])
    .then( users => res.status(200).send( users ))
    .catch(console.log)
});

/*Recommended Endpoints
POST - /api/recommended - Return a list of user's with the same property ( first name, hobby, etc..).
Sends a status of 200 and a list of user objects.
The logged in user shouldn't appear in this list.
POST - /api/recommended/add - Adds friend then updates recommended list.
When a user gets added, that user should no longer appear in the recommended area until that user is unfriended.
Sends a status of 200 and an updated list of user objects.
For example: If recommendations are being shown off of the same first name, the endpoint should re-run the query to find all recommended users with the same first name again.*/

app.post('/api/recommended', ( req, res, next ) => {
  let value = req.user[req.body.category];
  const db = app.get('db');

  db.recommend([ req.user.user_id, req.body.category, value, req.body.pageNum ])
    .then( users => res.status(200).send( users ))
    .catch(console.log)
});

app.post('/api/recommended/add', ( req, res, next ) => {

  const db = app.get('db');

  db.add_friend([ req.user.user_id, req.body.friend_id ])
    .then( () => {
      db.recommend([ req.user.user_id, req.body.category, value, req.body.pageNum ])
        .then( users => res.status(200).send( users ))
        .catch(console.log)
    })
    .catch(console.log);
});


app.listen(process.env.SERVER_PORT, () => console.log(`Hailing frequencies open on port ${process.env.SERVER_PORT}...`));