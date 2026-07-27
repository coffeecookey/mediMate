import express from 'express';

import { signup, login } from '../controllers/authController.js';
import { signupValidation, loginValidation } from '../middlewares/authValidation.js';


const router = express.Router();

router.post('/login', loginValidation, login);
router.post('/signup', signupValidation, signup);

export default router;
