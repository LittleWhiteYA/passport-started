const Passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Express = require('express');
const BodyParser = require('body-parser');

const users = {
  zack: {
    username: 'zack',
    password: '1234',
    id: 1,
  },
  node: {
    username: 'node',
    password: '5678',
    id: 2,
  },
}

const localStrategy = new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
    },
    (username, password, done) => {
      user = users[username];

      if (user == null) {
        return done( null, false, { message: 'Invalid user' } );
      };

      if (user.password !== password) {
        return done( null, false, { message: 'Invalid password' } );
      };

      done( null, user );
    }
  )

Passport.use('local', localStrategy );

const app = Express();
app.use(BodyParser.urlencoded({extended: false}));
app.use(BodyParser.json());
app.use(Passport.initialize());

app.post(
  '/login',
  Passport.authenticate('local', {session: false}),
  (req, res) => {
    res.send('User ID ' + req.user.id);
  }
);

app.listen(3000, () => {
  console.log('Listening on 3000');
});
