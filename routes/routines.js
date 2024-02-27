import { Router } from "express";
import { RoutinesController } from "../controllers/routines.js";

export function createRoutinesRoutes({RoutineModel}){
    const usersRoutes = Router()

    const routinesControllers = new RoutinesController({RoutineModel});

    usersRoutes.get('/', routinesControllers.get)
    usersRoutes.get('/:id', routinesControllers.getAllByUserId)

    usersRoutes.post('/', routinesControllers.postRoutine)

    usersRoutes.put('/:id', routinesControllers.putRoutineById)
    
    usersRoutes.delete('/:id', routinesControllers.deleteRoutineById)

    return usersRoutes
}
