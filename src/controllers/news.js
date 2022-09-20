const { News } = require("../models");

/**
 * Lista todas as notícias
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const all = async (req, res, next) => {
    try {
        res.send(await News.findAll());
    } catch (err) {
        next(err);
    }
}

/**
 * Consulta uma notícia
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const one = async (req, res, next) => {
    try {
        const id = req.params.id;
        const news = await News.findOne({
            where: {
                id: id
            }
        });

        if (!news)
            throw new Error("Notícia não encontrada");

        res.send(news);
    }
    catch (err) {
        next(err);
    }
}

/**
 * Inserir uma notícia
 * {
 *  name: "nome da notícia"
 * }
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const insert = async (req, res, next) => { 
    try {
        const news = await News.create(req.body);
        res.status(201).send(news);
    }
    catch (err) {
        next(err);
    }
}

/**
 * Alterar uma notícia
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const update = async (req, res, next) => { 
    try {
        const news = await News.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!news) {
            throw new Error("Notícia não existe");
        }

        news.set(req.body);

        res.send(await news.save());
    }
    catch (err) {
        next(err);
    }

}

/**
 * Remove uma notícia
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const remove = async (req, res, next) => { 
    try {
        const news = await News.findOne({
            where: {
                id: req.params.id
            }
        });

        if (!news) {
            throw new Error("Notícia não existe");
        }

        await news.destroy();
        res.status(204);
    }
    catch (err) {
        next(err);
    }
}


module.exports = { all, one, insert, update, remove };