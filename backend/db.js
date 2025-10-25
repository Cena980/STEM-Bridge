import mysql from "mysql2/promise";

export const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cena_980",
  database: "stem"
});

console.log("Connected to MySQL");
