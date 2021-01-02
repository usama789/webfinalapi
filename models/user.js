var mongoose = require("mongoose");

const Joi = require("@hapi/joi");
var UserSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role:{
      type:String,
      default:"user"
    }
}); 

const User = mongoose.model("User", UserSchema);
//signup validate
function validateUser(data) {
    const schema = Joi.object({
        name:Joi.string().min(3).max(15).required(),
        email:Joi.string().min(3).max(15).required(),
        password:Joi.string().min(3).max(15).required()
         
    });
    return schema.validate(data, { abortEarly: false });
  }
//sign in validate
function validateUserLogin(data) {
    const schema = Joi.object({
        
        email:Joi.string().min(3).max(15).required(),
        password:Joi.string().min(3).max(15).required()
         
    });
    return schema.validate(data, { abortEarly: false });
  }
module.exports = User;
module.exports.validate = validateUser;
module.exports.validate = validateUserLogin;