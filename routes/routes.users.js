import express from 'express';
import { HospitalController } from '../controllers/controllers.hospitals.js';
import { UsersController } from '../controllers/controllers.users.js';

export const UserRoutes = express.Router()
    UserRoutes.post("/user/signin", UsersController.signin) // connexion utilisateur
    UserRoutes.post("/user/signup", UsersController.signup) // creation de compte utilisateur
    UserRoutes.post("/user/sendsos", UsersController.sendsos) // cas utilisateur envoi un sos
    UserRoutes.post("/user/resendcode", UsersController.resendcodevalidation) // reenvoi du code de validation
    UserRoutes.post("/user/validate", UsersController.validateaccount) // reenvoi du code de validation

export const HospitalRoutes = express.Router()
    HospitalRoutes.get("/list", HospitalController.list)
    HospitalRoutes.post("/hospital/add", HospitalController.addhospital)