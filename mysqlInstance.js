import { createAPP } from "./app.js"
import { UserModel } from "./models/MySql/user.js"
import { ExerciseModel } from "./models/MySql/exercise.js"
import { RoutineModel } from "./models/MySql/routine.js"

const models = {
    UserModel: UserModel,
    ExerciseModel: ExerciseModel,
    RoutineModel: RoutineModel
}

createAPP({models:models,string:'FUNCIONA'})