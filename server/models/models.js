const {DataTypes} = require('sequelize')
const sequalize = require("../database.js")

const Token =  sequalize.model('token', {
    user:{type: DataTypes.INTEGER},
    refreshToken: {type: DataTypes.STRING, allowNull: false}
})
const User =  sequalize.model('user', {
    id:{type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false},
    password: {type: DataTypes.STRING, default: false},
    activationLink: {type: DataTypes.STRING},

})

const TokenToUser =  sequalize.model('tokentouser',{
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false}
})

User.hasOne(Token)
Token.belongsTo(User)

Token.hasMany(User)
User.belongsTo(Token)


module.exports = {
    Token,
    User
}