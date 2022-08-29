const userModel = require('../models/userModel');
const catalogModel = require('../models/catalogModel');

module.exports.createCatalog = async function (sellerId, products) {
    const seller = await userModel.findOne({ id: sellerId });

    if(seller) {
        const newCatalog = new catalogModel({sellerId, products});
        await newCatalog.save();
        
        return;
    } else {
        throw new Error("Not Found");
    }
}

module.exports.getCatalog = async function (sellerId) {
    const catalog = await catalogModel.findOne({ sellerId });

    if(catalog) {
        const catalogProducts = catalog.products.map((product)=> {
            return {
                productId: product.id,
                name: product.name,
                price: product.price,
                description: product.description
            }
        });

        return catalogProducts;
    }
}