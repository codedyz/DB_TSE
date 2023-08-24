import { createPool } from 'mysql2/promise'

export const pool = createPool({
    host: 'mysqldb',
    user: 'root',
    password: '123',
    port: 3306
})

pool.on("connection", () => console.log("DB Connected!"));
