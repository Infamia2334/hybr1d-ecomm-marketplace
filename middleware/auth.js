const jwt = require('jsonwebtoken');
const { http } = require('../config');
const authHelper = require('../helpers/tokenHelper');

async function authUser (req, res, next) {
    try {
        const token = req.header('Authorization').replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.SECRET_JWT);
        console.log(decoded);
        const user = await authHelper.findUser(decoded);
        
        req.userData = {
            id: user.id
        }
        next();
    } catch (error) {
        return res.status(http.unauthorized).send({
            message: ('unauthorizedAPIRequest'),
            error,
            status: { status: false, count: 0 }
        })
    }
}

async function authRole (req, res, next) {

}

module.exports = authUser;