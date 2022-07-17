import express from 'express';
import { Response } from '../helpers/helper.message.js';

export const RessourcesRoutes = express.Router()

RessourcesRoutes.get("/api/ressources/:ressources", (req, res, next) => { // validatorAccess
    const { ressources } = req.params;
    res.status(200)
    .sendFile(path.resolve(`assets/images/${ressources}`), (error) => {
        if(error){
            console.log(`no ressource found with the name : ${ressources}`);
            res.status(200).sendFile(path.resolve(`assets/images/default.png`));
        }
    });
});
