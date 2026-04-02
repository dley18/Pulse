import type { Request, Response } from "express";
import express from "express";
import { getConnection } from "../db/db.js";

const router = express.Router();
router.use(express.json());

router.get("/", async (req: Request, res: Response) => {
    const conn = await getConnection();
    try {
        const result = await conn.query(
            'SELECT * FROM "MEMORY" ORDER BY id DESC LIMIT 1'
        );

        res.status(200).json({
            ok: true,
            data: result.rows
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            error: "Failed to fetch MEMORY Metrics"
        });
    } finally {
        conn.release();
    }
});

router.post("/", async (req: Request, res: Response) => {
    const conn = await getConnection();
    try {
        const { snapshot_id, ram_percent, ram_used_GB, ram_total_GB } = req.body;
        await conn.query(
            `
            INSERT INTO "MEMORY" (snapshot_id, ram_percent, ram_used_GB, ram_total_GB)
            VALUES ($1, $2, $3, $4)
            `,
            [snapshot_id, ram_percent, ram_used_GB, ram_total_GB]
        );

        res.status(201).json({
            ok: true,
            memory: "Successfully sent MEMORY metrics"
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            error: "Failed to send MEMORY metrics"
        });
    } finally {
        conn.release();
    }
});

export default router;