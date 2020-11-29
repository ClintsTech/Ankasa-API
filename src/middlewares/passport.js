const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const { facebook, google } = require("../config/passport");
require("dotenv/config");

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
passport.use(
  new FacebookStrategy(
    facebook,
    async function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.use(
  new GoogleStrategy(
    google,
    async function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);
