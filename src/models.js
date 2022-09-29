const { Sequelize, DataTypes } = require('sequelize');

const DATABASE = process.env.NODE_ENV == "test" ? "sqlite::memory:" : (process.env.NODE_ENV == "production" ? process.env.DATABASE_URL : "sqlite:./database.sqlite");
// const DATABASE = process.env.NODE_ENV == "test" ? "sqlite::memory:" : "postgres:news:news@localhost:5432/news";
const database = new Sequelize(DATABASE, {logging: false});

const News = database.define('news', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    subject: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    image: {
        type: DataTypes.STRING
    },
    published_at: {
        type: DataTypes.DATE
    }
});

const Category = database.define('category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true
        }
    },
})

const User = database.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        }
    },
});

User.hasMany(News, {
    foreignKey: {
        allowNull: false
    }
});
News.belongsTo(User);

Category.belongsToMany(News, {through: "news_categories"});
News.belongsToMany(Category, { through: "news_categories" });

module.exports = { database, News, Category, User }