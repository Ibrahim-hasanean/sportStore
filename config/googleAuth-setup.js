const googleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");
const User = require("../models/user");
passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK
    },
    async (accessToken, refreshToken, profile, cb) => {
      let existUser = await User.findOne({ googleId: profile.id });
      console.log(profile._json);
      if (!existUser) {
        let newUser = await User.create({
          name: profile._json.name,
          googleId: profile.id
        });
        return cb(null, newUser);
      }
      return cb(null, existUser);
    }
  )
);
