const passport = require("passport");
const LocalStrategy = require("passport-local");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { authenticateUser, getUserById } = require("./database");

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    authenticateUser(email, password)
      .then((user) => {
        if (user) {
          return done(null, user);
        }

        return done(null, false);
      })
      .catch((err) => done(err));
  })
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: "hello123",
    },
    (jwtPayload, done) => {
      const { userId } = jwtPayload;

      getUserById(userId)
        .then((user) => {
          if (user) {
            return done(null, user);
          }

          return done(null, false);
        })
        .catch((err) => {
          done(err);
        });
    }
  )
);

passport.serializeUser((user, cb) => {
  process.nextTick(() => {
    cb(null, user);
  });
});

passport.deserializeUser((user, cb) => {
  process.nextTick(() => cb(null, user));
});

module.exports = passport;
