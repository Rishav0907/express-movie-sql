const Sequelize=require('sequelize');
const sequelize=require('../utils/mysql');

const Movies=sequelize.define('movies',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    poster_link:{
        type:Sequelize.STRING,
        allowNull:false
    },
    movie_name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    movie_details:{
        type:Sequelize.STRING(1000),
        allowNull:false
    },
    price:{
        type:Sequelize.DOUBLE,
        allowNull:false
    }
})

module.exports=Movies;