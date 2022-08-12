import express from 'express';
import { HospitalController } from '../controllers/controllers.hospitals.js';
import { UsersController } from '../controllers/controllers.users.js';
import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 15 minutes
	max: 17, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

export const UserRoutes = express.Router()
    UserRoutes.post("/user/signin", UsersController.signin) // connexion utilisateur
    UserRoutes.post("/user/signup", UsersController.signup) // creation de compte utilisateur
    UserRoutes.post("/user/sendsos", limiter, UsersController.sendsos) // cas utilisateur envoi un sos
    UserRoutes.post("/user/resendcode", UsersController.resendcodevalidation) // reenvoi du code de validation
    UserRoutes.post("/user/validate", UsersController.validateaccount) // reenvoi du code de validation
    UserRoutes.put("/user/updatehospitalref", UsersController.updatehospitalref) // mis a jour de l'opital de reference 
    UserRoutes.post("/user/sendmessage", UsersController.sendcustomizedsmsonsos) // mis a jour de l'opital de reference 
    UserRoutes.put("/user/loadme", UsersController.loadme)
    UserRoutes.get("/user/get/chat/:fill", UsersController.listmessage)

export const HospitalRoutes = express.Router()
    HospitalRoutes.get("/list", HospitalController.list)
    HospitalRoutes.post("/hospital/add", HospitalController.addhospital)