const express = require("express");
const cors = require("cors");

const categories = require("./routes/categories");
const news = require("./routes/news");
const users = require("./routes/users");
const auth = require("./routes/auth");

const app = new express();

app.use(cors());
app.use(express.json());

app.use(auth);
app.use("/categories", categories);
app.use("/news", news);
app.use("/users", users);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({
        error: true,
        content: err
    });
})


module.exports = app;