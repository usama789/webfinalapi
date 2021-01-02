const express = require("express");
let router = express.Router();

var { ContactUs } = require("../../models/contact");
//get contacts
router.get("/", async (req, res) => {
  let contact = await ContactUs.find();
  return res.send(contact);
});
router.post("/", async (req, res) => {
  let contact = new ContactUs();
  contact.name =req.body.name;
  contact.email =req.body.email;
  contact.subject =req.body.subject;
  contact.message =req.body.message;
  await contact.save();
  return res.send(contact);
});
router.delete("/:id", async (req, res) => {
  let contact =  await ContactUs.findByIdAndDelete(req.params.id);
  return res.send(contact);
});

module.exports = router;
