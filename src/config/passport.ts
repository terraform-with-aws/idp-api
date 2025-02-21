import { Strategy as JwtStrategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import passport from "passport";
import dotenv from "dotenv";

dotenv.config();

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET as string,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = { id: jwt_payload.id, email: jwt_payload.email } as Express.User; 
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  })
);

export default passport;
