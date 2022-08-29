const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type : String,
        required : true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

const catalogSchema = new Schema({
    sellerId :{
        type : String,
        required : true,
        unique: true
    },
    products: [productSchema]
}, { timestamps: true });

module.exports = mongoose.model("catalogs", catalogSchema);