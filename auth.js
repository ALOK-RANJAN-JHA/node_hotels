const SignUP=require('./modules/SignUP');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(async (USERNAME, password, done) => {
    // authentication logic
    try {
      
        // console.log('Received credentials:', USERNAME, password);
        const user = await SignUP.findOne({ username: USERNAME });
        if (!user)
            return done(null, false, { message: 'Incorrect username' });
        const isPasswordMatch =await user.comparePassword(password);
        if (isPasswordMatch)
            return done(null, user);
        else {
            return done(null, false, { message: 'Incorrect password' });
        }
    }
    catch(err) {
        return done(err);
    }
}));

module.exports=passport;