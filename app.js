import express from "express";
import dotenv from 'dotenv';
import uploader from 'express-fileupload';
import { Response } from './helpers/helper.message.js';
import cors from 'cors';
import { Routes } from "./routes/routes.routes.js";
import { WareValidateAccess } from "./middleware/ware.validateaccess.js";
import rateLimit from 'express-rate-limit';
import { RessourcesRoutes } from "./routes/routes.ressources.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3900;

const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	max: 50, // Limit each IP to 5 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
    message: {
        status: 403,
        message: "Y'v reached the limit of request in 15 mins",
        data: {}
    }
});

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(uploader());
app.use(limiter);

app.get("/", WareValidateAccess, (req, res, next) => {
    return Response(res, 200, {
        "appOwner": process.env.APPOWNER,
        "appName": process.env.APPNAME 
    })
});

app.use("/api/ressources", WareValidateAccess, RessourcesRoutes)

app.use("/api", WareValidateAccess, Routes);
app.use((req, res, next) => {
    console.log(`This route is not found => `, req.url);
    return Response(res, 404, {
        message: "There is nothing over here ! please the documentation! and come back again !",
        route: req.url,
        params: req.params
    })
});

app.listen(PORT, () => {
    console.log("----------------------------------------------------");
    console.log(`----- App running on port ::: ${ PORT } ------`);
    console.log("----------------------------------------------------");
});
