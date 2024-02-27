import express , { json } from 'express';
import { mainRoutes } from './routes/main.js';
import { createUsersRoutes } from './routes/users.js'
import { createExercisesRoutes } from './routes/exercises.js'
import { createRoutinesRoutes } from './routes/routines.js'
import { errorRoutes } from './routes/error.js';
import cors from 'cors'

export function createAPP({models,string}){
    const server = express();
    server.use(json())
    
    server.use(cors())
    server.get('/',mainRoutes)
    server.use('/users',createUsersRoutes({UserModel:models.UserModel}))
    server.use('/exercises',createExercisesRoutes({ExerciseModel:models.ExerciseModel}))
    server.use('/routines',createRoutinesRoutes({RoutineModel:models.RoutineModel}))
    server.get('/*',errorRoutes)

    const PORT = process.env.PORT ?? 1234
    server.listen(PORT,()=>{
        console.log(string)
    })
}

