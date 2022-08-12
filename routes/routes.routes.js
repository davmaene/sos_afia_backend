import express from 'express';
import { AdminsRoutes } from './routes.admins.js';
import { AgenstsRoutes } from './routes.agents.js';
import { NewsRoutes } from './routes.news.js';
import { HospitalRoutes, UserRoutes } from './routes.users.js';

export const Routes = express.Router();

        Routes.use("/users", UserRoutes)
        Routes.use("/admins", AdminsRoutes)
        Routes.use("/agents", AgenstsRoutes)
        Routes.use("/hospitals", HospitalRoutes)
        Routes.use("/news", NewsRoutes)