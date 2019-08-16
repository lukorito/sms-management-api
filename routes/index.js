import express from 'express';

import { signup, login } from '../controllers/auth.controller';
import checkToken from '../middlewares/authMiddleware' 
import { createContact, getAll, getOne } from '../controllers/contact.controller'
import { createMessage, 
        getAllMessages,
        updateMessage,
        deleteMessage,
        getOneMessage } from '../controllers/message.controller'

const router = express.Router();

// auth
router.post('/register', signup)
router.post('/login', login)

// contacts
router.post('/contact', checkToken, createContact)
router.get('/contact', checkToken, getAll)
router.get('/contact/:phoneNumber', checkToken, getOne)

// messages
router.post('/message', checkToken, createMessage)
router.get('/message', checkToken, getAllMessages)
router.get('/message/:id', checkToken, getOneMessage)
router.put('/message/:id', checkToken, updateMessage)
router.delete('/message/:id', checkToken, deleteMessage)



export default router;
