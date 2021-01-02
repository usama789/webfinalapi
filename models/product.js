var mongoose = require("mongoose");
const Joi = require("@hapi/joi");
var productSchema = mongoose.Schema({
    prName:String,
    prCategory:String,
    prPrice:String,
    prDetails:String,
    prImage:String
});
var Product = mongoose.model("Product", productSchema);

function validateProduct(data) {
  const schema = Joi.object({
      prName:Joi.string().min(3).max(15).required(),
      prCategory:Joi.string().max(10).required(),
      prPrice:Joi.number().min(0).required(),
      prDetails:Joi.string().max(20).required(),
      prImage:Joi.string().required()  
  });
  return schema.validate(data, { abortEarly: false });
}
module.exports.Product = Product;
module.exports.validate = validateProduct;
