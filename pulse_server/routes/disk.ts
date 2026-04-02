import type { Request, Response } from "express";
import express from "express";
import { getConnection } from "../db/db.js";

const router = express.Router();
router.use(express.json());

router.get("/", async (req: Request, res: Response) => {
    const conn = await getConnection();
    try {
        const result = await conn.query(
            'SELECT * FROM "DISK" ORDER BY id DESC LIMIT 1'
        );

        res.status(200).json({
            ok: true,
            data: result.rows
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            error: "Failed to fetch DISK Metrics"
        });
    } finally {
        conn.release();
    }
});

router.post("/", async (req: Request, res: Response) => {
    const conn = await getConnection();
    try {
        const { snapshot_id, mountpoint, percent, free_GB, used_GB, total_GB } = req.body;
        await conn.query(
            `
            INSERT INTO "DISK" (snapshot_id, mountpoint, percent, free_GB, used_GB, total_GB)
            VALUES ($1, $2, $3, $4, $5, $6)
            `,
            [snapshot_id, mountpoint, percent, free_GB, used_GB, total_GB]
        );

        res.status(201).json({
            ok: true,
            disk: "Successfully sent DISK metrics"
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            error: "Failed to send DISK metrics"
        });
    } finally {
        conn.release();
    }
});

export default router;