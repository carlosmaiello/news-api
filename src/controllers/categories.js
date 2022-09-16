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
const insert = async (req, res, next) => { 
    try {
        const category = await Category.create(req.body);
        res.status(201).send(category);
    }
    catch (err) {
        next(err);
    }
}

/**
 * Alterar uma categoria
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const update = async (req, res, next) => { 
    try {
        const category = await Category.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!category) {
            throw new Error("Categoria não existe");
        }

        category.set(req.body);

        res.send(await category.save());
    }
    catch (err) {
        next(err);
    }

}

/**
 * Remove uma categoria
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const remove = async (req, res, next) => { 
    try {
        const category = await Category.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!category) {
            throw new Error("Categoria não existe");
        }

        await category.destroy();
        res.status(204);
    }
    catch (err) {
        next(err);
    }
}


module.exports = { all, one, insert, update, remove };