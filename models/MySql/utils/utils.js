// PERMITE CREAR MI PROPIA QUERY AGREGANDO LAS VARIABLES EN UN ARRAY
export class MyQuery{
    // el construirse esta clase se le debe pasar la query inicial por defecto;
    // ejemplo SELECT * FROM tabla;
    constructor(queryString,varQuery = []){
        this.queryString = queryString;
        this.varQuery = varQuery
    }
    // sirve para concadenar las peticiones para el filtrado
    // recibe 3 parametros, la query para la peticion de sql
    // la variable con la que se comparara en la query y por ultimo
    // la condicion de como se tiene que comparar la informacion del cliente
    concatQuery(query,varQuery,condition = null){
        if(varQuery){
            this.queryString += this.varQuery.length > 0 ? ' AND ' : ' WHERE ';
            this.queryString += varQuery ? query : '';
            this.varQuery.push(condition != null ? condition.replace("[VAR]", varQuery) : varQuery)
        }
    }
}

