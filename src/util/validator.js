const mongoose = require("mongoose");

// ==> isValidBody
const isValidBody = (data) => {
  if (Object.keys(data).length > 0) return true;
  return false;
};

// ==> Validation for Empty or not
const isEmpty = function (value) {
  if (typeof value == "undefined" || value == null) return false;
  if (typeof value == "string" && value.trim().length == 0) return false;          
  return true;
};

// ==> Valid name
const isValidName = (name) => {
  const nm = name.trim();
  const regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(nm);
  return regex;
};

// ==> Valid Mobile
const isValidMobile = (mobile) => {
  const regex = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(
    mobile
  );
  return regex;
};

// ==> Validation for Object Id
const validObjectId = function (Id) {
  return mongoose.Types.ObjectId.isValid(Id);
};

module.exports = { isValidBody, isEmpty, isValidName, isValidMobile, validObjectId };
