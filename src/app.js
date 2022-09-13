const express = require("express");
const cors = require("cors");

const categories = require("./routes/categories");

const app = new express();

app.use(cors());
app.use(express.json());

app.use("/categories", categories);

app.use((err, req, res, next) => {
    // console.error(err.stack);
    res.status(500).send({
        error: true,
        content: err
    });
})


module.exports = app;