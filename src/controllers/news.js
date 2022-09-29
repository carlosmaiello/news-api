const { News, Category } = require("../models");

/**
 * Lista todas as notícias
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const all = async (req, res, next) => {
    try {
        res.send(await News.findAll({
            include: Category
        }));
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
            },
            include: Category
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
        const news = await News.create({...req.body, userId: req.userId });
        if (req.body.categories) {
            req.body.categories.forEach((category) => news.categories.add(category.id));
        }
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

        await news.save();

        if (req.body.categories) {
            req.body.categories.forEach((category) => news.categories.add(category.id));
        }

        await news.reload();

        res.send(news);
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