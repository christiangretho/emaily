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
    async (accessToken, refreshTocken, profile, done) => {
        const existingUser = await User.findOne({ googleId: profile.id })
            if (existingUser){
                //we already have a record with this ID
                return done(null, existingUser);
            }
            // we don't have a user record with this ID, make a new record!
            const user = await new User({ googleId: profile.id }).save()
            done(null, user);   
       }
    )
);