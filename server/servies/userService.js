const {User} = require('../models/models');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailservice = require('./mailService');
const tokenService = require('./tokenService.js');
const UserDto = require('../dtos/userDto');
class UserService {
    async  registration(email, password){
        const candidate = await  User.findOne({where:{email: email}});
        if(candidate){
            throw new Error(`Пользователь с таким почтвым адресом ${email} уже существует`);
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await  User.create(({email, password: hashPassword, activationLink}));
        await mailservice.sendActivationMail(email, activationLink);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return{
            ...tokens, user: userDto }
    }
}

module.exports = new UserService()