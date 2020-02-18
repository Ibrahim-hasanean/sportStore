const facebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

const User = require("../models/user");
passport.use(
  new facebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACBOOK_CALLBACK
    },
    async (accessToken, refreshToken, profile, cb) => {
      let existUser = await User.findOne({ facebookid: profile.id });
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
