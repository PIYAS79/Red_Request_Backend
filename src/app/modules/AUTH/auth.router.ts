import express from 'express'
import { authController } from './auth.controller';
import validationRequest from '../../middlewares/validationRequest';
import { Zod_Login_Data_Type } from './auth.zod.validation';


const router = express.Router();


router.post('/login', validationRequest(Zod_Login_Data_Type), authController.LoginUser_Controller);


export const auth_Router = router;