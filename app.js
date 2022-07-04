import express from "express";
import dotenv from 'dotenv';
import uploader from 'express-fileupload';
import { Response } from './helpers/helper.message.js';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3900;

app.use(cors());
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(express.json({ limit: '50mb' }));
app.use(uploader());

app.get("/", (req, res, next) => {
    return Response(
        res, 
        200, 
        {
            "appOwner": process.env.APPOWNER,
            "appName": process.env.APPNAME
        }
    )
});

app.use((req, res, next) => {
    return Response(res, 404, "There is nothing over here ! please the documentation!")
});

app.listen(PORT, () => {
    console.log("----------------------------------------------------");
    console.log(`----- App running on port ::: ${PORT} ------`);
    console.log("----------------------------------------------------");
});
