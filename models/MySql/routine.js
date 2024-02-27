import { MyQuery } from './utils/utils.js';
import { connection } from './utils/connection.js';

export class RoutineModel{
    static async getAll(){
        try{
            // const myQuery = new MyQuery(`SELECT id , name , description , image , video FROM gym.exercises`)
            const myQuery = new MyQuery(`
                SELECT idRoutines as ROUTINES_ID, gym.routines.name as ROUTINES_NAME  ,  gym.routines.routines_set as SETS , (
                    select count(idRoutines) from gym.routinesExercises where idRoutines = ROUTINES_ID
                ) AS EJERCICIOS 
                FROM gym.routinesExercises 
                INNER JOIN gym.routines 
                WHERE gym.routines.id = idRoutines 
                GROUP BY ROUTINES_ID, SETS , EJERCICIOS;
            `)
            const [results, fields] = await connection.query(myQuery.queryString,myQuery.varQuery)
            // connection.release();
            return results
        }
        catch(e){
            console.log(e)
            return {error: 'Problema al encontrar los registro'}
        }
    }
    static async getAllByUserId({id}){
        try{
            // const myQuery = new MyQuery(`SELECT id , name , description , image , video FROM gym.exercises`)
            const myQuery = new MyQuery(`
                SELECT idRoutines as ROUTINES_ID, gym.routines.name as ROUTINES_NAME  ,  gym.routines.routines_set as SETS , (
                    select count(idRoutines) from gym.routinesExercises where idRoutines = ROUTINES_ID
                ) AS EJERCICIOS 
                FROM gym.routinesExercises 
                INNER JOIN gym.routines 
                WHERE gym.routines.id = idRoutines AND gym.routines.idUsers = ?
                GROUP BY ROUTINES_ID, SETS , EJERCICIOS;
            `,[id])
            const [results, fields] = await connection.query(myQuery.queryString,myQuery.varQuery)
            // connection.release()
            return results
        }
        catch(e){
            return {error: 'Problema al encontrar los registro'}
        }
    }

    static async getByRoutinesId({idRoutines}){
        try{
            const myQuery = new MyQuery(`
                SELECT gym.routines.routines_set as SETS , repeticiones , gym.exercises.name 
                FROM gym.routinesExercises 
                INNER JOIN gym.exercises
                INNER JOIN gym.routines 
                WHERE gym.routines.id = idRoutines AND gym.exercises.id = idExercises
                AND idRoutines = ?;
            `,[idRoutines])
            let [result,fields] = await connection.query(myQuery.queryString,myQuery.varQuery)
            return result.length > 0 ? result : {error: 'Dato no encontrado'};
        }
        catch(e){
            return {error: 'Problema al encontrar el registro'}
        }
    }

    static async postRoutine({routines_set,name,idUsers,repetitions,idExercises}){
        try{
            const newRoutine = new MyQuery(`
                INSERT INTO routines (routines_set,name,idUsers) 
                VALUES (?,?,?);
            `,[routines_set,name,idUsers])
            let [resultNewRoutine,fieldsNewRoutine] = await connection.query(newRoutine.queryString,newRoutine.varQuery)
            const idRoutines = parseInt(resultNewRoutine.insertId);
            let newRoutineExcersive = ''
            const newRoutineExcersiveVariables = []
            newRoutineExcersive += 'INSERT INTO routinesExercises (repeticiones,idRoutines,idExercises) VALUES ? '
            idExercises.forEach((idExercise,index) => {
                newRoutineExcersiveVariables.push([repetitions[index],idRoutines,idExercise])
            });
            let [results,fields] = await connection.query(newRoutineExcersive,[newRoutineExcersiveVariables])
            return results.affectedRows > 0 ? {status:200} : {error: 'Dato no registrado'};
        }
        catch(e){
            console.log(e)
            return {error: 'Problema al modificar el registro'}
        }
    }

    static async putRoutineById({routines_set,name,idUsers,id}){
        try{
            const myQuery = new MyQuery(`
                UPDATE routines SET
                routines_set = ?,
                name = ?,
                idUsers = ?
                WHERE id = ?;
            `,[routines_set,name,idUsers,id])
            let [result,fields] = await connection.query(myQuery.queryString,myQuery.varQuery)
            console.log(result,'RESULT')
            console.log(fields,'FIELDS')
            return result.affectedRows > 0 ? {status:200} : {error: 'Dato no registrado'};
        }
        catch(e){
            return {error: 'Problema al modificar el registro'}
        }
    }

    // static async deleteRoutineById({id}){
    //     try{
    //         const myQuery = new MyQuery(`
    //             DELETE FROM routines WHERE id = ?;
    //         `,[id])
    //         let [result,fields] = await connection.query(myQuery.queryString,myQuery.varQuery)
    //         console.log(result,'RESULT')
    //         console.log(fields,'FIELDS')
    //         return result.affectedRows > 0 ? {status:200} : {error: 'Dato no registrado'};
    //     }
    //     catch(e){
    //         return {error: 'Problema al eliminar el registro'}
    //     }
    // }
}
