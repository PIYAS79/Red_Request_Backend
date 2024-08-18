
import express from 'express';
import { user_router } from '../modules/USER/user.router';

const router = express.Router()

const project_routes = [
    {
        path:'/user',
        route:user_router
    },
]


project_routes.forEach(one=>router.use(one.path,one.route));


export default router;