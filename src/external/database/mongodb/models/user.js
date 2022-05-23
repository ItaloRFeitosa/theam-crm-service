const { Schema, model, models } = require("mongoose");
const { required, toObject } = require("../helpers");

const UserSchema = new Schema(
  {
    email: { ...required(String), unique: true },
    password: required(String),
    role: required(String),
    deleted: { ...required(Boolean), default: false}
  },
  {
    timestamps: true,
    toObject,
  }
);
const UserModel = models.UserModel || model("User", UserSchema);

module.exports = { UserModel };
