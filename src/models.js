const { Sequelize, DataTypes } = require('sequelize');

const database = new Sequelize("sqlite::memory:");

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

// const User = database.define('user', {
//  ...
// });


module.exports = { database, News }