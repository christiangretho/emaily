const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();

//code to create cookie session {
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 10000,
        keys: [keys.cookieKey]
    })
);
//code to initialize cookie session
app.use(passport.initialize());
app.use(passport.session());
//}

//enables routes to be watched by app
require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000
app.listen(PORT); 