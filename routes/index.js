import express from 'express';

import { signup, login } from '../controllers/auth.controller';
import checkToken from '../middlewares/authMiddleware' 
import { createContact, getAll, getOne } from '../controllers/contact.controller'

const router = express.Router();

// auth
router.post('/register', signup)
router.post('/login', login)

// contacts
router.post('/contact', checkToken, createContact)
router.get('/contact', checkToken, getAll)
router.get('/contact/:phoneNumber', checkToken, getOne)


export default router;
