const Koa = require('koa');
const mongoose = require('mongoose');
const config = require('./config');

const dbConfig = config.db;

mongoose.connect(`${dbConfig.host}:${dbConfig.port}/${dbConfig.name}`);

const app = new Koa();

module.exports = app;
