const jwt = require('jsonwebtoken');

const expiresIn = 86400;

module.exports.generateToken = async (data) => { return jwt.sign({ data }, process.env.SECRET_JWT, { expiresIn }) };