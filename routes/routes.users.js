import express from 'express';
import { UsersController } from '../controllers/controllers.users';

export const UserRoutes = express.Router()
    UserRoutes.get("/user/signin", UsersController.signin)
    UserRoutes.post("/user/sendsos", UsersController.sendsos)