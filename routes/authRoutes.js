const passport = require('passport');


//get route handler - first argument is the path; the second is the code we want to be exicuted
module.exports = (app) => {
    app.get( 
        '/auth/google', 
        passport.authenticate('google', {
            scope: ['profile', 'email']
        })
    );
    
    app.get(
        '/auth/google/callback',
        passport.authenticate('google')
    );

    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    });

//  req = request
//  res = response

    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    });
};

