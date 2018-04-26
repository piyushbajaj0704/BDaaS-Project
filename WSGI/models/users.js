/**
 * Created by charl on 11/4/2017.
 */
const mongoose = require('mongoose'),
    Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    encrypted_password: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now()
    },
    fullName: String
});

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compareSync(password, this.encrypted_password);
};
mongoose.model('User', UserSchema);
