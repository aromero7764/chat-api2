const router = require('express').Router()
const messageServices = require('../messages/messages.services')
const passportJWT = require('../middlewares/auth.middleware')



router.route('/')
    .post(passportJWT.authenticate('jwt', {session: false}), messageServices.postMessage)

router.route('/:conversation_id/messages/:message_id')
    .get(passportJWT.authenticate('jwt', {session: false}), messageServices.getMessageById )
    .delete(passportJWT.authenticate('jwt', {session: false}), messageServices.deleteMessage)

module.exports = router

