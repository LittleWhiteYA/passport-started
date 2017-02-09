const Express = require('express');
const app = Express();
const session = require('express-session');
const BodyParser = require('body-parser');
const passport = require('passport');
const strategies = require('./passport-strategies');

app.use(BodyParser.urlencoded({extended: false}));
app.use(BodyParser.json());

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));

// passport
app.use(passport.initialize());
app.use(passport.session());

passport.use('local', strategies.localStrategy);
passport.use(strategies.facebookStrategy);

passport.serializeUser((user, done) => {
    console.log('serializeUser:');
    console.log(user);
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    console.log('deserializeUser:');
    console.log(id);
    done(null, id);
});

app.post(
  '/login',
  passport.authenticate('local', {session: false}),
  (req, res) => {
    res.send('User ID ' + req.user.id);
  }
);

app.get('/auth/facebook', passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
        successReturnToOrRedirect: 'http://localhost:3000/success',
        failureRedirect: 'http://localhost:3000/failure',
        session: true,
    })
);

app.get('/', (req, res) => {
    res.send('I got req.user from deserializeUser: ' + req.user);
});

app.listen(3000, () => {
  console.log('Listening on 3000');
});
