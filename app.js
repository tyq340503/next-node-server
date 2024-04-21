const express = require("express");
const fileRoute = require("./src/routes/fileRoute");
const dateRoute = require("./src/routes/dateRoute");
const sqlRoute = require("./src/mysql");
const transRoute = require("./src/routes/transRoute");

const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req, res) => {
    res.send("node server hello");
});

app.use('/file', fileRoute);
app.use('/time', dateRoute);
app.use('/sql', sqlRoute);
app.use('/trans', transRoute);

app.listen(4000, () => {
    console.log("node server running");
});