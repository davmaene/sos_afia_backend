import express from 'express';
import { AgentsControllers } from '../controllers/controllers.agents.js';

export const AgenstsRoutes = express.Router();
    AgenstsRoutes.get("/list", AgentsControllers.list)
    AgenstsRoutes.post("/agent/signup", AgentsControllers.signup)
    AgenstsRoutes.post("/agent/signin", AgentsControllers.signin)
    AgenstsRoutes.put("/agent/loadme", AgentsControllers.loadme)
    AgenstsRoutes.get("/agent/loadsos/:hospitalref", AgentsControllers.loadsoscase)
    AgenstsRoutes.get("/agent/loadsmsgroup/:idagent", AgentsControllers.groupchats)