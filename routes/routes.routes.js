import express from 'express';
import { AdminsRoutes } from './routes.admins.js';
import { UserRoutes } from './routes.users.js';

export const Routes = express.Router();
            Routes.use("/users", UserRoutes)
            Routes.use("/admins", AdminsRoutes)