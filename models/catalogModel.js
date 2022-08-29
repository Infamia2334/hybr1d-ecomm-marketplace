const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const catalogSchema = new Schema({
    sellerUserId :{
        type : String,
        required : true
    },
    products: {
        type: Array,
        required: true
    }
});

module.exports = mongoose.model("catalogs", catalogSchema);