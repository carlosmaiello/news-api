const jwt = require('jsonwebtoken');
const { User } = require('../models');

module.exports = (options={}) => {

    const required = options.required == undefined ? true : options.required;

    return async (req, res, next) => {
        try {
            const token = req.header('Authorization');

            var data;

            try {
                data = jwt.verify(token, "q1w2e3r4t5y6");
                const user = await User.findByPk(data.userId);

                if (user) {
                    req.userId = data.userId;
                    req.user = user;
                }
                else {
                    if (required)
                        throw new Error("Usuário inválido!");
                }

            }
            catch (error) {
                if (required)
                    throw new Error("Token inválido!");
            }

            next();
        }
        catch (error) {
            next(error);
        }
    }
}