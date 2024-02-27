import { Router } from "express";
import { ExercisesController } from "../controllers/exercises.js";

export function createExercisesRoutes({ExerciseModel}){
    const usersRoutes = Router()

    const exercisesControllers = new ExercisesController({ExerciseModel});

    usersRoutes.get('/', exercisesControllers.getAll)
    usersRoutes.get('/:id', exercisesControllers.getById)

    usersRoutes.post('/', exercisesControllers.postExercise)

    usersRoutes.put('/:id', exercisesControllers.putExerciseById)

    usersRoutes.delete('/:id', exercisesControllers.deleteExerciseById)

    return usersRoutes
}
