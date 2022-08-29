const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    buyerUserId: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("orders", orderSchema);