const Express = require('express');
const app = Express();
const passport = require('passport');
const BodyParser = require('body-parser');

const strategies = require('./passport-strategies');


app.use(BodyParser.urlencoded({extended: false}));
app.use(BodyParser.json());

app.use(passport.initialize());
passport.use('local', strategies.localStrategy);
passport.use(strategies.facebookStrategy);

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
        session: false,
    })
);

app.listen(3000, () => {
  console.log('Listening on 3000');
});
