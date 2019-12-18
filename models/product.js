const Sequelize = require('sequelize');
const db = require('../config/db');

const Posts = db.define('product',{
    user_id:{
        type: Sequelize.NUMBER,
    },
    name:{
        type: Sequelize.STRING,
    },
    description:{
        type: Sequelize.STRING,
    }
});

module.exports = Posts;