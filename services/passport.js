const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('../config/keys');
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    // done is a callback that helps move passport along
    // user.id is an id that is assigned by mongo not the google id
    done(null, user.id);
    });

passport.deserializeUser((id, done) => {
    // id is the user.id or the token assigned to the user by mongoDB
    User.findById(id)
        .then(user => {
            done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
    {
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy:true
    },
    (accessToken, refreshTocken, profile, done) => {
        User.findOne({ googleId: profile.id })
            .then((existingUser) => {
                if (existingUser){
                    done(null, existingUser);
                } else {
                    new user({ googleId: profile.id }).save()
                    .then(user => done(null, user));
                }
            })
       })
);