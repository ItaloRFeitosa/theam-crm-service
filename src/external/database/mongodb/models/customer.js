const { Schema, model, models } = require("mongoose");
const { required, toObject } = require("../helpers");

const CustomerPhotoSchema = new Schema({
  provider: required(String),
  bucket: required(String),
  key: required(String),
},{
  _id: false,
  timestamps: false
})

const CustomerSchema = new Schema(
  {
    name: required(String),
    surname: required(String),
    email: { ...required(String), unique: true },
    photo: { type: CustomerPhotoSchema, default: null },
    deleted: { ...required(Boolean), default: false},
    createdBy: { ...required(Schema.Types.ObjectId), ref: "User"},
    updatedBy: { ...required(Schema.Types.ObjectId), ref: "User"}
  },
  {
    timestamps: true,
    toObject,
  }
);
const CustomerModel = models.CustomerModel || model("Customer", CustomerSchema);

module.exports = { CustomerModel };
