import pg from "pg";
const { Pool } = pg;
import "dotenv/config";

const { DB_HOST, DB_PASSWORD, DB_DATABASE} = process.env;

const config = {
    user: "postgres",
    host: DB_HOST,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    allowExitOnIdle: true,
};

export const pool = new Pool(config);