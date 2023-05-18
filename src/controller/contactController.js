const Contact = require("../model/contactModel");
const {
  isValidBody,
  isEmpty,
  isValidName,
  isValidMobile,
  validObjectId,
} = require("../util/validator");

// ==> Create Contacts
const createContact = async (req, res) => {
  try {
    const data = req.body;
    const { name, mobile } = data;

    if (!isValidBody(data)) {
      return res
        .status(400)
        .send({ status: false, message: "Please enter data." });
    }

    if (!isEmpty(name)) {
      return res
        .status(400)
        .send({ status: false, message: "name is required." });
    }
    if (!isValidName(name)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid name." });
    }

    if (!isEmpty(mobile)) {
      return res
        .status(400)
        .send({ status: false, message: "mobile is required." });
    }
    if (!isValidMobile(mobile)) {
      return res
        .status(400)
        .send({ status: false, message: "Enter valid mobile number." });
    }

    const existMobile = await Contact.findOne({ mobile });
    if (existMobile) {
      return res.status(401).send({
        status: false,
        message: "This Mobile number already registered.",
      });
    }

    const saveData = await Contact.create(data);
    return res
      .status(201)
      .send({ status: true, message: "Success", data: saveData });
  } catch (error) {
    return res.status(500).send({ status: false, error: error.message });
  }
};

// ==> view & filter list of all contacts
const getContacts = async (req, res) => {
  try {
    let Query = req.query;
    let filter = {};
    let { name, mobile } = Query;

    if (name) {
      if (!isValidName(name))
        return res
          .status(400)
          .send({ status: false, message: "Enter valid name." });
      filter["name"] = { $regex: name };
    }

    if (mobile) {
      if (!isValidMobile(mobile))
        return res
          .status(400)
          .send({ status: false, message: "Enter valid mobile number." });
      filter["mobile"] = { $regex: mobile };
    }

    let getContacts = await Contact.find(filter).sort({ name: 1 });

    if (getContacts.length === 0) {
      return res.status(404).send({ status: false, message: "no data found" });
    }
    return res
      .status(200)
      .send({ status: true, message: "Success", data: getContacts });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

// ==> Update Contact
const updateContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const data = req.body;
    let { name, mobile } = data;

    if (!isEmpty(contactId)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide contact Id" });
    }
    if (!validObjectId(contactId)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid Contact Id" });
    }

    const contactData = await Contact.findOne({ _id: contactId });
    if (!contactData) {
      return res
        .status(404)
        .send({ status: false, message: "Contact not found" });
    }

    if (!isValidBody(data)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide data." });
    }

    if (name || name == "") {
      if (!isEmpty(name)) {
        return res
          .status(400)
          .send({ status: false, message: "name is required." });
      }
      if (!isValidName(name)) {
        return res
          .status(400)
          .send({ status: false, message: "Enter valid name." });
      }
    }

    if (mobile || mobile == "") {
      if (!isEmpty(mobile)) {
        return res
          .status(400)
          .send({ status: false, message: "mobile is required." });
      }
      if (!isValidMobile(mobile)) {
        return res
          .status(400)
          .send({ status: false, message: "Enter valid mobile number." });
      }
      const existMobile = await Contact.findOne({ mobile });
      if (existMobile) {
        return res.status(401).send({
          status: false,
          message: "This Mobile number already registered.",
        });
      }
    }

    const updateData = await Contact.findOneAndUpdate(
      { _id: contactId },
      data,
      {
        new: true,
      }
    );
    res.status(200).send({
      status: true,
      message: "Contact profile updated successfully.",
      data: updateData,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

// ==> delete Contact
const deleteContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;

    if (!isEmpty(contactId)) {
      return res
        .status(400)
        .send({ status: false, message: "please provide contact Id" });
    }
    if (!validObjectId(contactId)) {
      return res
        .status(400)
        .send({ status: false, message: "Please provide valid Contact Id" });
    }

    const deleteUser = await Contact.findByIdAndDelete({ _id: contactId });
    return res.status(200).send({
      status: true,
      message: "Contact profile deleted successfully.",
      data: deleteUser,
    });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

module.exports = { createContact, getContacts, updateContact, deleteContact };
