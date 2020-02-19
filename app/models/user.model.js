const mongoose = require('mongoose');

var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email)
};

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  useremail: { type: String,unique: true,lowercase: true,trim:true,required: 'Email address is required',
  validate: [validateEmail, 'Please fill a valid email address'],
  match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] },
  password: { type: String, required: true },
  admin: Boolean,
  location: String,
  meta: {age: Number,website: String}
},
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', UserSchema);