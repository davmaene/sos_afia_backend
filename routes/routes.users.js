import express from 'express';
import { UsersController } from '../controllers/controllers.users.js';

export const UserRoutes = express.Router()
    UserRoutes.post("/user/signin", UsersController.signin) // connexion utilisateur
    UserRoutes.post("/user/signup", UsersController.signup) // creation de compte utilisateur
    UserRoutes.post("/user/sendsos", UsersController.sendsos) // cas utilisateur envoi un sos