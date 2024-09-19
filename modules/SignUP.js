const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const SignUPSchema = new mongoose.Schema({
    username: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    }
});

SignUPSchema.pre('save', async function (next) {
    const person = this;
    // hashed the password only if it has been modified (or is new)
    if (!person.isModified('password')) return next();
    try {
        // hash function genraton
        const salt = await bcrypt.genSalt(10);

        // hashed password
        const hashedPassword = await bcrypt.hash(person.password, salt);

        // overwrite the plane password with new hashed password
        person.password = hashedPassword;
        next();
    }
    catch (err) {
        return next(err);
    }
});

SignUPSchema.methods.comparePassword = async function (candidatepassword) {
    try {
        // use bcrypt to compare the provided password with hashed password
        const isMatch =await bcrypt.compare(candidatepassword,this.password);
        return isMatch;
    }
    catch (err) {
        throw err;
    }
}

// how campare function work
// if we enter password as Alok
// Alok---------->kjdfahifsdsJ`/`/SDH3932213csfjskfshffsrfhrf`/
// kjdfahifsdsJ`/`/SDH3932213csfjskfshffsrfhrf`/ ---->extract salt
// salt+Alok -------->ewrjh xe283474nweewnrxwer/263e3.3/34c
// compare -> wrjh xe283474nweewnrxwer/263e3.3/34c with stored hashed kjdfahifsdsJ`/`/SDH3932213csfjskfshffsrfhrf`/


SignUPSchema.plugin(uniqueValidator);
const SignUP = mongoose.model('Login', SignUPSchema);
module.exports=SignUP;