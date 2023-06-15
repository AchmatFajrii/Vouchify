const passport = require("passport");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

// Google Plus Strategy
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/redirect"
},
    function (accessToken: any, refreshToken: any, profile: any, done: any) {
        return done(null, profile);
    }
));

passport.serializeUser(function(user: any, done: any) {
    done(null,user);
})

passport.deserializeUser(function(user: any, done: any) {
    done(null,user);
})