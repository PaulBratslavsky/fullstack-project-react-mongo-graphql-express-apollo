const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "invalid email"],
  },

  password: {
    type: String,
    required: true,
    minlength: 5,
  },

  firstName: {
    type: String,
    maxlength: 50,
  },

  lastName: {
    type: String,
    maxlength: 50,
  },

  token: {
    type: String,
  },
});

UserSchema.pre("save", function (next) {
  var user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, function (error, salt) {
      if (error) return next(error);

      bcrypt.hash(user.password, salt, function (error, hash) {
        if (error) return next(error);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.checkPassword = async function (candidatePassword) {
  var user = this;
  const result = await bcrypt.compare(candidatePassword, user.password);
  return result;
};

UserSchema.methods.generateToken = async function () {
  var user = this;
  var token = jwt.sign({ email: user.email }, process.env.SECRET, {
    expiresIn: "7d",
  });
  user.token = token;
  return user.save();
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };
