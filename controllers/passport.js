// config/passport.js
var LocalStrategy = require('passport-local').Strategy;

// load up the user model
var User = require('../models/User.js');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // Passport session setup ==================================================
    // =========================================================================

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) { // callback with email and password from our form
        if (email) email = email.toLowerCase();

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'local.email' :  email }, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err) return done(err);

            // if no user is found, return the message
            if (!user) return done(null, false); 

            // if the user is found but the password is wrong
            if (!user.validPassword(password)) return done(null, false); 

            // all is well, return successful user
            return done(null, user);
        });

    }));



    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function(req, email, password, done) {
            if (email) email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
            // asynchronous
            process.nextTick(function() {
                // if the user is not already logged in:
                if (!req.user) {
                    User.findOne({ 'local.email' :  email }, function(err, user) {
                        // if there are any errors, return the error
                        if (err) return done(err);

                        // check to see if theres already a user with that email
                        if (user) {
                            return done(null, false);
                        } else {

                            // create the user
                            var newUser            = new User();
                            newUser.local.email    = email;
                            newUser.local.password = newUser.generateHash(password);
                            newUser.name           = req.body.name;
                            newUser.isSeller       = req.body.isSeller;

                            if (req.body.isSeller) {
                                newUser.instagramAccount = req.body.instagramAccount;
                            }

                            console.log(newUser);

                            newUser.save(function (err, result) {
                                if (err) return done(err);
                                return done(null, newUser);
                            });
                        }

                    });
                // if the user is logged in but has no local account...
                } else {
                    // User is logged in and already has a local account. Ignore signup.
                    // (You should log out before trying to create a new account, user!)
                    return done(null, req.user);
                }

            });
        }
    ));

};