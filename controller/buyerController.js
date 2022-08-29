const { http } = require("../config");
const userService = require("../service/userService");
const catalogService = require("../service/catalogService");

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
        return res.status(http.internalServerError).send({
            message: req.__("api-500"),
            error,
            status: { status: false, count: 0 },
        });
    }
}