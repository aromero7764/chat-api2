const uuid = require('uuid')
const Messages = require('../models/messages.models')

const Conversations =require('../models/conversations.models')

const findMessageByID = async(id) => {
    const data = await Messages.findAll({
            where: {
                id: id
            },
        include: {
            model: Messages
        }
    })
    return data
}

const deleteMessage = async(id) => {
    const data = await Messages.destroy({
        where: {
            id: id
        }
    })
    return data
}

const createMessage = async (obj) => {
    const data = await Messages.create({
        id: uuid.v4(),
        userId : obj.userId,
        conversationId: obj.conversationId,
        message: obj.message
    })
    return data
}



module.exports = {
    createMessage,
    findMessageByID,
    deleteMessage

}
