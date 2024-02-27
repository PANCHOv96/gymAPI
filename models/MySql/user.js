import { MyQuery } from './utils/utils.js';
import { connection } from './utils/connection.js';

export class UserModel{
    static async getAll(){
        try{
            const myQuery = new MyQuery(`SELECT users.id , users.firstname , users.lastname , users.email , users.status, users.date_status , roles.title 
            FROM gym.users 
            INNER JOIN gym.roles 
            WHERE roles.id = roleId`)
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
            const myQuery = new MyQuery(`SELECT users.id , users.firstname , users.lastname , users.email , users.status, users.date_status , roles.title 
            FROM gym.users 
            INNER JOIN gym.roles 
            WHERE roles.id = roleId AND users.id = ?`,[id])
            let [result,fields] = await connection.query(myQuery.queryString,myQuery.varQuery)
            return result.length > 0 ? result : {error: 'Dato no encontrado'};
        }
        catch(e){
            return {error: 'Problema al encontrar el registro'}
        }
    }
    static async postUser({firstname,lastname,email}){
        try{
            const myQuery = new MyQuery(`
                INSERT INTO users (firstname,lastname,email,status,roleId) 
                VALUES (?,?,?,false,1);
            `,[firstname,lastname,email])
            let [result,fields] = await connection.query(myQuery.queryString,myQuery.varQuery)
            return result.affectedRows > 0 ? {status:200} : {error: 'Dato no registrado'};
        }
        catch(e){
            return {error: 'Problema al crear el registro'}
        }
    }
    
    static async putUser({firstname,lastname,email}){
        try{
            const myQuery = new MyQuery(`
                UPDATE users SET
                firstname = ?,
                lastname = ?,
                email = ?
                WHERE id = ?;
            `,[firstname,lastname,email,id])
            let [result,fields] = await connection.query(myQuery.queryString,myQuery.varQuery)
            console.log(result,'RESULT')
            console.log(fields,'FIELDS')
            return result.affectedRows > 0 ? {status:200} : {error: 'Dato no registrado'};
        }
        catch(e){
            return {error: 'Problema al modificars el registro'}
        }
    }

    static async putUserStatusById({status,id}){
        try{
            const myQuery = new MyQuery(`
                UPDATE users SET
                status = ?
                WHERE id = ?;
            `,[status,id])
            let [result,fields] = await connection.query(myQuery.queryString,myQuery.varQuery)
            console.log(result,'RESULT')
            console.log(fields,'FIELDS')
            return result.affectedRows > 0 ? {status:200} : {error: 'Dato no registrado'};
        }
        catch(e){
            return {error: 'Problema al modificar el status del usuario'}
        }
    }

    static async putUserRoleById({roleId,id}){
        try{
            const myQuery = new MyQuery(`
                UPDATE users SET
                roleId = ?
                WHERE id = ?;
            `,[roleId,id])
            let [result,fields] = await connection.query(myQuery.queryString,myQuery.varQuery)
            console.log(result,'RESULT')
            console.log(fields,'FIELDS')
            return result.affectedRows > 0 ? {status:200} : {error: 'Dato no registrado'};
        }
        catch(e){
            return {error: 'Problema al modificar el rol del usuario'}
        }
    }
}


