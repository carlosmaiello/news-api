const { User } = require("../models");

/**
 * Lista todas as usuárioss
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const all = async (req, res, next) => {
    try {
        res.send(await User.findAll());
    } catch (err) {
        next(err);
    }
}

/**
 * Consulta uma usuários
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const one = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await User.findOne({
            where: {
                id: id
            }
        });

        if (!user)
            throw new Error("Usuário não encontrada");

        res.send(user);
    }
    catch (err) {
        next(err);
    }
}

/**
 * Inserir uma usuários
 * {
 *  name: "nome da usuários"
 * }
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const insert = async (req, res, next) => { 
    try {
        const user = await User.create(req.body);
        res.status(201).send(user);
    }
    catch (err) {
        next(err);
    }
}

/**
 * Alterar uma usuários
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const update = async (req, res, next) => { 
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!user) {
            throw new Error("Categoria não existe");
        }

        user.set(req.body);

        res.send(await user.save());
    }
    catch (err) {
        next(err);
    }

}

/**
 * Remove uma usuários
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const remove = async (req, res, next) => { 
    try {
        const user = await User.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!user) {
            throw new Error("Categoria não existe");
        }

        await user.destroy();
        res.status(204);
    }
    catch (err) {
        next(err);
    }
}


module.exports = { all, one, insert, update, remove };