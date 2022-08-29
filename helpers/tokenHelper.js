const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const expiresIn = 86400;

module.exports.generateToken = async (data) => { return jwt.sign({ data }, process.env.SECRET_JWT, { expiresIn }) };

module.exports.findUser = async function (tokenData) {
    console.log(tokenData.data);
    const user = await userModel.findOne({ _id: tokenData.data });
    if(!user)
        throw new Error("User not found");

    return user;
}