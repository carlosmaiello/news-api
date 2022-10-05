const { News, Category } = require("../models");
const { Op } = require("sequelize");

/**
 * Lista todas as notícias
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const all = async (req, res, next) => {
    try {
        const where = [];

        if (!req.user)
            where.push({ visibility: "public" });
        else
            where.push({
                [Op.or]: [
                    { visibility: "public" },
                    { visibility: "private", userId: req.userId }
                ]
            });

        res.send(await News.findAll({
            include: Category,
            where
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
        const { id } = req.params;

        const where = [];

        if (!req.user)
            where.push({ id, visibility: "public" });
        else
            where.push({
                id,
                [Op.or]: [
                    { visibility: "public" },
                    { visibility: "private", userId: req.userId }
                ]
            });

        const news = await News.findOne({
            where,
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
        console.log({ ...req.body, userId: req.userId });
        const news = await News.create({ ...req.body, userId: req.userId });
        if (req.body.categories) {
            req.body.categories.forEach(async (category) => await news.addCategory(category.id));
        }

        await news.reload({
            include: Category
        });
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
            req.body.categories.forEach(async (category) => await news.addCategory(category.id));
        }

        await news.reload({
            include: Category
        });

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
        res.status(204).send();
    }
    catch (err) {
        next(err);
    }
}


module.exports = { all, one, insert, update, remove };