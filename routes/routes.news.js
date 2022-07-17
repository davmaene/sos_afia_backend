import express from 'express';
import { NewsControllers } from '../controllers/controllers.news.js';

export const NewsRoutes = express.Router();
    NewsRoutes.get("/list/categ/:hospitalref", NewsControllers.listbyrefhospital)
    NewsRoutes.get("/list/all", NewsControllers.listall)