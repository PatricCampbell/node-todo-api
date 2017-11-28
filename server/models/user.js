const mongoose = require("mongoose");
const validator = require("validator");
const { sign, verify } = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email",
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  tokens: [
    {
      access: { type: String, required: true },
      token: { type: String, required: true },
    },
  ],
});

UserSchema.methods.generateAuthToken = function() {
  const user = this;
  const access = "auth";
  const token = sign(
    { _id: user.id.toHexString(), access },
    "patriciscool",
  ).toString();

  user.tokens.push({ access, token });

  return user.save().then(() => {
    return token;
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = { User };
