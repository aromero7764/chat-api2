const uuid = require('uuid')
const { findUserByEmail } = require('../users/users.controllers')
const { comparePassword } = require('../utils/crypto')

const RecoveryPassword = require('../models/recoveryPasswords.models')

const checkUsersCredentials = async (email, password) => {
    try {
        const user = await findUserByEmail(email)
        const verifyPassword = comparePassword(password, user.password)
        if(verifyPassword){
            return user
        } 
        return null //coregir el bug
    } catch (error) {
        return null
    }
}


//no es necesario para el chat api- pero si para el skeleton
const createRecoveryToken = async (email) => {
    try {
        const user = await findUserByEmail(email)
        const data = await RecoveryPassword.create({
            id: uuid.v4(),
            userId : user.id
        })
        return data
    } catch (error) {
        return error
    } 
} 


module.exports = {
    checkUsersCredentials,
    createRecoveryToken
}