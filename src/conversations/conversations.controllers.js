const uuid = require('uuid')

const Conversations = require('../models/conversations.models')
const Participants = require('../models/participants.models')
const Users = require('../models/users.models')

const findAllConversations = async () => {
    const data = await Conversations.findAll({
        include: {
            model: Participants,
            include: {
                model : Users
            }
        }
    })
    return data
}

const findConversationById = async (id) => {
    const data = await Conversations.findOne({
        where: {
            id: id
        },
        include: {
            model: Participants,
            include: {
                model: Users
            }
        }
    })
    return data
}


/* 
Necesitamos crear una conversacion entre Sahid y Erik , cuando creas 
la conversacion es necesario 
crear los 2 participantes que estaran en esa conversacion que acabas de crear 
*/

const createConversation = async (obj) => {
    const newConversation = await Conversations.create({
        id: uuid.v4(),
        title: obj.title,
        imgUrl: obj.imgUrl,
        userId: obj.ownerId //? Creador de la conversacion (owner)
    })
    const participant1 = await Participants.create({
        id: uuid.v4(),
        userId: obj.ownerId, //? este es el owner que viene desde el token
        conversationId: newConversation.id
    })
    const participant2 = await Participants.create({
        id: uuid.v4(),
        userId: obj.participantId, //? Este es el otro usuario que viene desde el body
        conversationId: newConversation.id
    })

    return {
        newConversation,
        participant1,
        participant2
    }
}

const updateConversation = async(id, obj) => {
    const data = await Conversations.update(obj, {
        where: {
            id: id
        }
    })
    return data[0] //? array
    //?  [1] Se edito algo correctamente (si encontro el id)
    //? [0] No se edito nada (porque no encontro el id)
}


const removeConversation = async (id) => {
    const data = await Conversations.destroy({
        where: {
            id: id
        }
    })
    return data
}


//creando una conversacion prueba
/*  createConversation({
     title: 'Conversacion Alberto - Erick',//? Titulo del chat
    ownerId: '20be8b2c-2c8c-46ca-b09a-fdae94873f8d', //? Evertz como owner
     participantId: '7a076625-8615-4a8b-8fdf-6ca653a92a33' //? Sahid como invitado
 })
 .then(data => console.log(data))
 .catch(err => console.log(err)) */

module.exports = {
    findAllConversations,
    createConversation, 
    findConversationById,
    updateConversation,
    removeConversation
}
