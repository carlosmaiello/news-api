const app = require('./app');
const { database } = require('./models');
const PORT = 3000;

database.sync({ alter: process.env.NODE_ENV == "production" }).then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta ${PORT} ...`);
    });
});

