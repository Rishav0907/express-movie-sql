const Sequelize=require('sequelize');
const sequelize=require('../utils/mysql');

const Users=sequelize.define('Users',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:Sequelize.STRING 
    },
    email:{
        type:Sequelize.STRING,
        unique:true
    }
})

module.exports=Users