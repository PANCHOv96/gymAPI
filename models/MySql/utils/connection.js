// Get the client
import mysql from 'mysql2/promise';

// Create the connection to database
export const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'admin',
  database: 'gym',
  port: 3306
});