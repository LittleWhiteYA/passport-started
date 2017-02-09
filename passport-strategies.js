const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const config = require('./config');

const localStrategy = new LocalStrategy({
        usernameField: 'username',
        passwordField: 'password',
    },
    (username, password, done) => {
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
        };        
        user = users[username];

        if (user == null) {
          return done(null, false, { message: 'Invalid user' });
        };

        if (user.password !== password) {
          return done(null, false, {message: 'Invalid password'});
        };

        done(null, user);
    }
);

const facebookStrategy = new FacebookStrategy({
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: "http://localhost:3000/auth/facebook/callback",
    },
    (accessToken, refreshToken, profile, done) => {
        console.log('profile: ');
        console.log(profile);
        if (! profile) {
            return done(null, false);
        } else {
            return done(null, profile);
        }
    });

module.exports = {
    localStrategy,
    facebookStrategy,
};
