const { http } = require("../config");
const userService = require("../service/userService");

module.exports.register = async function (req, res) {
    try {
        let { name, userName, phoneNumber, password, type } = req.body;

        if( !name || !userName || !phoneNumber || !password ) {
            return res.status(http.badRequest).send({
                message: res.__("api-400-all-field-mandatory"),
                status: { status: false, count: 0 }
            });
        }

        let user = await userService.register(name, userName, phoneNumber, password, type );
        
        if(user.registered) {
            return res.status(http.created).send({
                message: res.__("api-200"),
                data: { user: user.userRecord, token: user.token },
                status: { status: true, count: 0 },
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(http.internalServerError).send({
            message: req.__("api-500"),
            error,
            status: { status: false, count: 0 },
        });
    }
}

module.exports.login = async function (req, res) {
    try {
        const { userName, password } = req.body;
        if(!userName || !password) {
            res.status(http.badRequest).send({
                message: req.__("api-400"),
                status: { status: false, count: 0 }
            });
        }

        const userData = await userService.login(userName, password);
        
        if(userData) {
            return res.status(http.ok).send({
                message: req.__("login"),
                data: userData,
                status: { status: true, count: 0 }
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(http.internalServerError).send({
            message: req.__("api-500"),
            error,
            status: { status: false, count: 0 },
        });
    }
}