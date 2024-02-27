import { Router } from "express";
import { UsersController } from "../controllers/users.js";

export function createUsersRoutes({UserModel}){
    const usersRoutes = Router()

    const usersControllers = new UsersController({UserModel});

    usersRoutes.get('/', usersControllers.getAll)
    usersRoutes.get('/:id', usersControllers.getById)
    
    usersRoutes.post('/', usersControllers.postUser)

    usersRoutes.put('/:id', usersControllers.putUser)
    usersRoutes.put('/Status/:id/', usersControllers.putUserStatusById)
    usersRoutes.put('/Role/:id', usersControllers.putUserRoleById)

    return usersRoutes
}
