const {Sequelize} = require("sequelize")


module.exports = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASSWORD, {
    dialect: "postgres",
    port: process.env.DB_PORT
})

