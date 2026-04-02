import type { Request, Response } from "express";
import express from "express";
import { getConnection } from "../db/db.js";

const router = express.Router();
router.use(express.json());

router.get("/", async (req: Request, res: Response) => {
    const conn = await getConnection();
    try {
        const result = await conn.query(
            'SELECT * FROM "GPU" ORDER BY id DESC LIMIT 1'
        );

        res.status(200).json({
            ok: true,
            data: result.rows
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            error: "Failed to fetch GPU Metrics"
        });
    } finally {
        conn.release();
    }
});

router.post("/", async (req: Request, res: Response) => {
    const conn = await getConnection();
    try {
        const { snapshot_id, gpu_name, utilization, vram_total_GB, vram_used_GB, vram_free_GB, temp } = req.body;
        await conn.query(
            `
            INSERT INTO "GPU" (snapshot_id, gpu_name, utilization, vram_total_GB, vram_used_GB, vram_free_GB, temp)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
            `,
            [snapshot_id, gpu_name, utilization, vram_total_GB, vram_used_GB, vram_free_GB, temp]
        );

        res.status(201).json({
            ok: true,
            gpu: "Successfully sent GPU metrics"
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            error: "Failed to send GPU metrics"
        });
    } finally {
        conn.release();
    }
});

export default router;