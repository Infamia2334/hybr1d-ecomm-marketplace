const { http } = require("../config");
const catalogService = require("../service/catalogService");

module.exports.createCatalog = async function (req, res) {
    try {
        const sellerId = req.userData.id;
        const products = req.body.products; //Add Joi validation if scaled
        
        await catalogService.createCatalog(sellerId, products);

        return res.status(http.ok).send({
            message: res.__("api-200"),
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