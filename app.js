// app.js
const express = require('express');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use('/shopping-list', routes);



module.exports = app;