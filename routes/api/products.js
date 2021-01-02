const express = require("express");
let router = express.Router();
const validateProduct = require("../../middlewares/validateProduct");
const admin = require("../../middlewares/admin");

const auth = require("../../middlewares/auth");

var { Product } = require("../../models/product");
//get products
router.get("/",async (req, res) => {
  console.log(req.user);
  let page = Number(req.query.page ? req.query.page : 1);
  let perPage = Number(req.query.perPage ? req.query.perPage : 10);
  let skipRecords = perPage * (page - 1);
  let products = await Product.find().skip(skipRecords).limit(perPage);
  return res.send(products);
});
//get single products
router.get("/:id", async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product)
      return res.status(400).send("Product With given ID is not present"); //when id is not present id db
    return res.send(product); //everything is ok
  } catch (err) {
    return res.status(400).send("Invalid ID"); // format of id is not correct
  }
});
//update a record
router.put("/:id", async (req, res) => {
  let product = await Product.findById(req.params.id);
  product.prName = req.body.prName;
  product.prCategory = req.body.prCategory;
  product.prPrice=req.body.prPrice;
  product.prDetails=req.body.prDetails;
  product.prImage =req.body.prImage;
  await product.save();
  return res.send(product);
});
//delete a record
router.delete("/:id", async (req, res) => {
  let product = await Product.findByIdAndDelete(req.params.id);
  return res.send(product);
});
//Insert a record
router.post("/", validateProduct, async (req, res) => {
  let product = new Product();
  product.prName = req.body.prName;
  product.prCategory = req.body.prCategory;
  product.prPrice=req.body.prPrice;
  product.prDetails=req.body.prDetails;
  product.prImage =req.body.prImage;
  await product.save();
  return res.send(product);
});
module.exports = router;
