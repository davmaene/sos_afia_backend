import express from 'express';
import { AdminsRoutes } from './routes.admins';
import { UserRoutes } from './routes.users';

export const Routes = express.Router();
            Routes.use("/users", UserRoutes)
            Routes.use("/admins", AdminsRoutes)