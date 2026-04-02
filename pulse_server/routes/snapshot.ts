import type { Request, Response} from "express";
import express from "express";
import { getConnection } from "../db/db.js";

const router = express.Router();
router.use(express.json());

router.get("/", async (req: Request, res: Response) => {
    const conn = await getConnection();
    try {
        const result = await conn.query(
            'SELECT * FROM "SNAPSHOTS" ORDER BY id DESC LIMIT 1'
        );

        res.status(200).json({
            ok: true,
            data: result.rows
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            error: "Failed to fetch Snapshot"
        });
    } finally {
        conn.release();
    }
});

router.post("/", async (req: Request, res: Response) => {
    const conn = await getConnection();
    try {
        const { hostname, timestamp } = req.body;
        await conn.query(
            `
            INSERT INTO "SNAPSHOTS" (hostname, timestamp)
            VALUES ($1, $2)
            `,
            [hostname, timestamp]
        );

        res.status(201).json({
            ok: true,
            snapshot: "Successfully sent snapshot"
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            error: "Failed to send snapshot"
        });
    } finally {
        conn.release();
    }
});

export default router;