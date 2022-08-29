const orderModel = require('../models/orderModel');
const userModel = require('../models/userModel');

module.exports.createOrder = async function (buyerId, sellerId, products) {
    const seller = await userModel.findOne({ id: sellerId });

    if(!seller) {
        throw new Error("Seller not Found :(");
    } else {
        const newOrder = new orderModel({ buyerId, sellerId, products });
        await newOrder.save();
    }
    
    return;
}

module.exports.getOrders = async function (sellerId) {
    const orders = await orderModel.find({ sellerId });

    let ordersList = orders.map((order)=> {
        return {
            orderId: order.id,
            // buyerId: order.buyerId,
            products: order.products
        }
    });

    return ordersList;
}