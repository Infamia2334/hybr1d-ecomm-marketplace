const jwt = require('jsonwebtoken');
const { http } = require('../config');
const authHelper = require('../helpers/tokenHelper');

async function authUser (req, res, next) {
    try {
        const token = req.header('Authorization').replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.SECRET_JWT);
        const reqType = req.baseUrl.split('/')[3];
        const user = await authHelper.findUser(decoded);
        
        req.userData = {
            id: user.id,
            role: user.type
        }
        if(reqType === req.userData.role)
            next();
        else
            throw new Error('Unauthorised Access token !!');
    } catch (error) {
        console.log(error);
        return res.status(http.unauthorized).send({
            message: ('unauthorizedAPIRequest'),
            error,
            status: { status: false, count: 0 }
        })
    }
}

// async function authRole (req, res, next) {
//     try {
//         if(req.userData === "buyer")
//     } catch (error) {
        
//     }
// }

module.exports = authUser;