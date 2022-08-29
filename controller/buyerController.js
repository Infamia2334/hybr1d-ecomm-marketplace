const { http } = require("../config");
const userService = require("../service/userService");

module.exports.getAllSellers = async function (req, res) {
    try {
        const sellers = await userService.getSellers();

        return res.status(http.created).send({
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