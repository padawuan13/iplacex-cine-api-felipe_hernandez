import { Router } from 'express';
import {
    handleInsertActorRequest,
    handleGetActoresRequest,
    handleGetActorByIdRequest,
    handleGetActoresByPeliculaRequest
} from "./controller.js";

const actorRoutes = Router();

actorRoutes.post("/actor", handleInsertActorRequest);
actorRoutes.get("/", handleGetActoresRequest);
actorRoutes.get("/actor/:id", handleGetActorByIdRequest);
actorRoutes.get("/actor/pelicula/:id", handleGetActoresByPeliculaRequest);

export default actorRoutes;