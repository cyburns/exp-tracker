import passport from "passport";
import bcrypt from "bcryptjs";
import User from "../db/models/user.js";
import { GraphQLLocalStrategy } from "graphql-passport";

export const passportConfig = async () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (error) {
      done(error);
    }
  });
};

passport.use(
  new GraphQLLocalStrategy(async (username, password, done) => {
    try {
      const user = await User.fineOne({ username });

      if (!user) {
        return done(null, false, { message: "User not found" });
      }

      const isValid = bcrypt.compare(password, user.password);

      if (!isValid) {
        return done(null, false, { message: "Incorrect password" });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);
