const userModel = require('../models/userModel');
const tokenHelper = require('../helpers/tokenHelper');

module.exports.register = async function ( name, userName, phoneNumber, password, type ) {
    let registered = false;

    let userRecord = await userModel.findOne({
        userName
    });

    if (userRecord) {
        registered = true;
        return { registered, userRecord };
    } else {
        let newUser = new userModel({ name, userName, phoneNumber, password, type });
        userRecord = await newUser.save();

        const token = await tokenHelper.generateToken(userRecord.id);
        registered = true;
        return { registered, userRecord, token };
    }
}

module.exports.login = async function ( userName, password ) {
    const user = await userModel.findUser(userName, password);
    const token = await tokenHelper.generateToken(user.id);

    return { userId: user.id, token };
}

module.exports.getSellers = async function () {
    const sellers = await userModel.find({ type: 'seller' });

    if(sellers.length > 0) {
        let sellerData = sellers.map((seller)=> {
            return {
                name: seller.name,
                type: seller.type,
                userName: seller.userName,
                phoneNumber: seller.phoneNumber
            }
        });
        
        return sellerData;
    } else
        throw new Error("Not Found!");
}