import type { Request, Response } from "express";
import express from "express";
import { getConnection } from "../db/db.js";

const router = express.Router();
router.use(express.json());

router.get("/", async (req: Request, res: Response) => {
    const conn = await getConnection();
    try {
        const result = await conn.query(
            'SELECT * FROM "BATTERY" ORDER BY id DESC LIMIT 1'
        );

        res.status(200).json({
            ok: true,
            data: result.rows
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            error: "Failed to fetch BATTERY Metrics"
        });
    } finally {
        conn.release();
    }
});

router.post("/", async (req: Request, res: Response) => {
    const conn = await getConnection();
    try {
        const { snapshot_id, percent, charging, secs_left } = req.body;
        await conn.query(
            `
            INSERT INTO "BATTERY" (snapshot_id, percent, charging, secs_left)
            VALUES ($1, $2, $3, $4)
            `,
            [snapshot_id, percent, charging, secs_left]
        );

        res.status(201).json({
            ok: true,
            battery: "Successfully sent BATTERY metrics"
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            error: "Failed to send BATTERY metrics"
        });
    } finally {
        conn.release();
    }
});

export default router;