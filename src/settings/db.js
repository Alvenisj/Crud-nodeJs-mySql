const mysql = require('mysql');
const {database} = require('./keys');
const {promisify} = require('util');

//SE RECIBEN LOS DATOS QUE VIENEN EN EL DATABASE PARA REVISAR CONEXIÓN
const pool = mysql.createPool(database);

//SE RECIBE DOS PARAMETROS; UN ERROR O LA CONEXIÓN SATISFACTORIA
pool.getConnection((err, conn) => {

    if (err) {
        //ERRORES COMUNES EN LA CONEXIÓN DE LA BASE DE DATOS
        if (err.code == 'PROTOCOL_CONNECTION_LOST') {
            console.log('LA CONEXIÓN DE LA BASE DE DATOS FUE CERRADA'); 
        }
        if (err.code == 'ECONNREFUSED') {
            console.log('LA CONEXIÓN DE LA BASE DE DATOS FUE RECHAZADA');
        }  
    }

    if (conn) {

        conn.release();
        console.log('DB IS CONNECTED ON CLEVER-CLOUD');
        return;
        
    }

});

//A TRAVÉS DE UNA PROMESA GENERAMOS LA CONEXIÓN
pool.query = promisify(pool.query);

module.exports = pool;




