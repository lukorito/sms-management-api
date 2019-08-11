import express from 'express';

import { signup } from '../controllers/auth.controller';

const router = express.Router();

// registrations
router.post('/register', signup)


export default router;
