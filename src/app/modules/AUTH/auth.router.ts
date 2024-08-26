import express from 'express'
import { authController } from './auth.controller';
import validationRequest from '../../middlewares/validationRequest';
import { Zod_Change_Pass_Type, Zod_Login_Data_Type } from './auth.zod.validation';
import validate_Token from '../../middlewares/tokenValidation';
import { USER_ROLES } from '../../global/typeConstants';


const router = express.Router();

// login user route
router.post('/login', validationRequest(Zod_Login_Data_Type), authController.LoginUser_Controller);

// change password route
router.patch('/change', validate_Token(USER_ROLES.ADMIN,USER_ROLES.DONOR,USER_ROLES.REQUESTER), validationRequest(Zod_Change_Pass_Type), authController.ChangePass_Controller);

export const auth_Router = router;