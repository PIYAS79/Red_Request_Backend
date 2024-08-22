
import express from 'express';
import { user_router } from '../modules/USER/user.router';
import { auth_Router } from '../modules/AUTH/auth.router';

const router = express.Router()

const project_routes = [
    {
        path: '/user',
        route: user_router
    },
    {
        path: '/auth',
        route: auth_Router
    },
]


project_routes.forEach(one => router.use(one.path, one.route));


export default router;