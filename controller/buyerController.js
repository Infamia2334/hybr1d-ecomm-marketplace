const { http } = require("../config");
const userService = require("../service/userService");
const catalogService = require("../service/catalogService");
const orderService = require("../service/orderService");

module.exports.getAllSellers = async function (req, res) {
    try {
        const sellers = await userService.getSellers();

        return res.status(http.ok).send({
            message: res.__("api-200"),
            data: { user: sellers },
            status: { status: true, count: 0 },
        });
    } catch (error) {
        return res.status(http.internalServerError).send({
            message: req.__("api-500"),
            error,
            status: { status: false, count: 0 },
        });
    }
}

module.exports.getCatalog = async function (req, res) {
    try {
        const sellerId = req.params.sellerId;

        const catalog = await catalogService.getCatalog(sellerId);

        return res.status(http.ok).send({
            message: res.__("api-200"),
            data: catalog,
            status: { status: true, count: 0 },
        });
    } catch (error) {
        console.log(error);
        return res.status(http.internalServerError).send({
            message: req.__("api-500"),
            error,
            status: { status: false, count: 0 },
        });
    }
}

module.exports.createOrder = async function (req, res) {
    try {
        const buyerId = req.userData.id;
        const products = req.body.products; //Add Joi validation if scaled
        const sellerId = req.params.sellerId;

        await orderService.createOrder(buyerId, sellerId, products);

        return res.status(http.created).send({
            message: res.__("api-201"),
            data: 'Order Created successfully :)',
            status: { status: true, count: 0 },
        });
    } catch (error) {
        console.log(error);
        return res.status(http.internalServerError).send({
            message: req.__("api-500"),
            error,
            status: { status: false, count: 0 },
        });
    }
}