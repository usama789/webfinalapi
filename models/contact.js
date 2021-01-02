var mongoose = require("mongoose");

const Joi = require("@hapi/joi");
var ContactSchema = mongoose.Schema({
    name: String,
    email: String,
    subject:String,
    message: String
}); 

const ContactUs = mongoose.model("ContactUs", ContactSchema);
//contact us validate
function validateContact(data) {
    const schema = Joi.object({
        name:Joi.string().min(3).max(15).required(),
        email:Joi.string().min(3).max(15).required(),
        subject:Joi.string().min(3).max(15).required(),
        message:Joi.string().min(3).max(50).required()
         
    });
    return schema.validate(data, { abortEarly: false });
  }

module.exports.ContactUs = ContactUs;
module.exports.validate = validateContact;
