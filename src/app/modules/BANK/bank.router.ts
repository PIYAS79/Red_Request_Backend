

import express from 'express';
import validate_Token from '../../middlewares/tokenValidation';
import validationRequest from '../../middlewares/validationRequest';
import { Zod_Bank_Type } from './bank.zod.validation';
import { USER_ROLES } from '../../global/typeConstants';
import { Bank_Controller } from './bank.controller';

const router = express.Router();



// create a donate info
router.post('/create', validate_Token(USER_ROLES.ADMIN, USER_ROLES.DONOR, USER_ROLES.REQUESTER), validationRequest(Zod_Bank_Type), Bank_Controller.Create_A_Donate_Controller);
// get all donate info 
router.get('/', Bank_Controller.Get_All_Bank_Data_Controller)
// get single donate info 
router.get('/:did', Bank_Controller.Get_A_Bank_Data_Controller)


export const bank_Router = router;
