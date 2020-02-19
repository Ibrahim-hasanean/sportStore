const facebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
const User = require("../models/user");
passport.use(
  new facebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: process.env.FACEBOOK_CALLBACK,

      profileFields: ["id", "emails", "displayName", "name"]
    },
    async (accessToken, refreshToken, profile, cb) => {
      let existUser = await User.findOne({ facebookId: profile.id });
      console.log("profile");
      console.log(profile);
      if (!existUser) {
        let newUser = await User.create({
          name: profile._json.name,
          facebookid: profile.id,
          email: profile._json.id
        });
        return cb(null, newUser);
      }
      return cb(null, existUser);
    }
  )
);
