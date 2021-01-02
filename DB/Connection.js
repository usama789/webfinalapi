const mongoose = require('mongoose');

const URI = "mongodb+srv://rafay:rafay123@cluster0.2lvfi.mongodb.net/ProductsDB?retryWrites=true&w=majority";

const connectDB = async() => {
    await mongoose.connect(URI, {
        useUnifiedTopology:true,
        useNewUrlParser:true
    });
    console.log('db connected');
}

module.exports = connectDB;