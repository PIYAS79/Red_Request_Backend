import express from 'express'
import { User_Controller } from './user.controller';
import validationRequest from '../../middlewares/validationRequest';
import { Zod_UserSchema } from './user.zod.validation';



const router = express.Router();


// create user route
router.post('/create', validationRequest(Zod_UserSchema), User_Controller.Create_User_Controller);


export const user_router = router;