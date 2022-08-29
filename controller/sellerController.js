const { http } = require("../config");
const catalogService = require("../service/catalogService");
const orderService = require("../service/orderService");

module.exports.createCatalog = async function (req, res) {
    try {
        const sellerId = req.userData.id;
        const products = req.body.products; //Add Joi validation if scaled

        await catalogService.createCatalog(sellerId, products);

        return res.status(http.created).send({
            message: res.__("api-201"),
            data: "Catalog created :)",
            status: { status: true, count: 0 },
        });
    } catch (error) {
        return res.status({
            message: req.__("api-500"),
            error,
            status: { status: false, count: 0 },
        })
    }
}

module.exports.getOrder = async function (req, res) {
    try {
        const sellerId = req.userData.id;

        const ordersList = await orderService.getOrders(sellerId);

        return res.status(http.ok).send({
            message: res.__("api-200"),
            data: ordersList,
            status: { status: true, count: 0 },
        });
    } catch (error) {
        console.log(error);
        return res.status({
            message: req.__("api-500"),
            error,
            status: { status: false, count: 0 },
        });
    }
}