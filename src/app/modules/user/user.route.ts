import express from 'express';
import { UserControllers } from './user.controller';
import { UserValidations } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post('/register', validateRequest(UserValidations.createUserValidationSchema), UserControllers.registerUser);


export const UserRouters = router; 