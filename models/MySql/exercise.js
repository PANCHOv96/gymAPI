import { MyQuery } from './utils/utils.js';
import { connection } from './utils/connection.js';

export class ExerciseModel{
    static async getAll(){
        try{
            // const myQuery = new MyQuery(`SELECT id , name , description , image , video FROM gym.exercises`)
            const myQuery = new MyQuery(`SELECT id , name , description , image , video FROM gym.exercises;`)
            const [results, fields] = await connection.query(myQuery.queryString,myQuery.varQuery)
            // connection.end()
            return results
        }
        catch(e){
            return {error: 'Problema al encontrar los registro'}
        }
    }
    static async getById({id}){
        try{
            const myQuery = new MyQuery(`SELECT id , name , description , image , video FROM gym.exercises WHERE id = ?`,[id])
            let [result,fields] = await connection.query(myQuery.queryString,myQuery.varQuery)
            return result.length > 0 ? result : {error: 'Dato no encontrado'};
        }
        catch(e){
            return {error: 'Problema al encontrar el registro'}
        }
    }
    static async postExercise({name,description,image,video}){
        try{
            const myQuery = new MyQuery(`
                INSERT INTO exercises (name,description,image,video) VALUES (?,?,?,?);
            `,[name,description,image,video])
            let [result,fields] = await connection.query(myQuery.queryString,myQuery.varQuery)
            return result.affectedRows > 0 ? {status:200} : {error: 'Dato no registrado'};
        }
        catch(e){
            return {error: 'Problema al crear el registro'}
        }
    }

    static async putExerciseById({name,description,image,video,id}){
        try{
            const myQuery = new MyQuery(`
                UPDATE exercises SET
                name = ?,
                description = ?,
                image = ?,
                video = ?
                WHERE id = ?;
            `,[name,description,image,video,id])
            let [result,fields] = await connection.query(myQuery.queryString,myQuery.varQuery)
            console.log(result,'RESULT')
            console.log(fields,'FIELDS')
            return result.affectedRows > 0 ? {status:200} : {error: 'Dato no registrado'};
        }
        catch(e){
            return {error: 'Problema al modificar el registro'}
        }
    }

    // static async deleteExerciseById({id}){
    //     try{
    //         const myQuery = new MyQuery(`
    //             DELETE FROM exercises WHERE id = ?;
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


