const { Category } = require("../models");

/**
 * Lista todas as categorias
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const all = async (req, res, next) => {
    try {
        res.send(await Category.findAll());
    } catch (err) {
        next(err);
    }
}

/**
 * Consulta uma categoria
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const one = async (req, res, next) => {
    try {
        const id = req.params.id;
        const category = await Category.findOne({
            where: {
                id: id
            }
        });

        if (!category)
            throw new Error("Notícia não encontrada");

        res.send(category);
    }
    catch (err) {
        next(err);
    }
}

/**
 * Inserir uma categoria
 * {
 *  name: "nome da categoria"
 * }
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const insert = (req, res, next) => { }

/**
 * Alterar uma categoria
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const update = (req, res, next) => { }

/**
 * Remove uma categoria
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const remove = (req, res, next) => { }


module.exports = { all, one, insert, update, remove };