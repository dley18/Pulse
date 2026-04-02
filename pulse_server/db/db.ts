import type { Request, Response } from "express";
import type { Pool as PgPool, PoolClient} from "pg";
import express from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import { createAllDBTables } from "./tables.js";

const router = express.Router();
router.use(express.json());
dotenv.config();

const pool: PgPool = new Pool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

const getConnection = async (): Promise<PoolClient> => {
    return pool.connect();
}

const initDB = async (): Promise<void> => {
    try {
        await createAllDBTables(pool);
    } catch (err) {
        console.log(err);
    }
}

router.get("/health", async (req: Request, res: Response) => {
    try {
        await pool.query('SELECT 1'); // Ping to confirm DB is alive
        res.json({ status: "ok", db: "connected"});
    } catch (err) {
        res.status(500).json({ status: "error", db: "unreachable"});
    }
});



export {
    router,
    initDB,
    getConnection
};