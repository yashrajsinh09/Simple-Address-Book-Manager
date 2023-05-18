const express = require("express");
const router = express.Router();
const {
  createContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../controller/contactController");

router.post("/contacts", createContact);
router.get("/contacts", getContacts);
router.put("/contacts/:contactId", updateContact);
router.delete("/contacts/:contactId", deleteContact);

module.exports = router;
