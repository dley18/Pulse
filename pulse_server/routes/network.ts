import type { Request, Response } from "express";
import express from "express";
import { getConnection } from "../db/db.js";

const router = express.Router();
router.use(express.json());

router.get("/", async (req: Request, res: Response) => {
    const conn = await getConnection();
    try {
        const result = await conn.query(
            'SELECT * FROM "NETWORK" ORDER BY id DESC LIMIT 1'
        );

        res.status(200).json({
            ok: true,
            data: result.rows
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            error: "Failed to fetch NETWORK Metrics"
        });
    } finally {
        conn.release();
    }
});

router.post("/", async (req: Request, res: Response) => {
    const conn = await getConnection();
    try {
        const { snapshot_id, network_interface, GB_sent, GB_recv, packets_sent, errors_in, errors_out, drops_in, drops_out } = req.body;
        await conn.query(
            `
            INSERT INTO "NETWORK" (snapshot_id, interface, GB_sent, GB_recv, packets_sent, errors_in, errors_out, drops_in, drops_out)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            `,
            [snapshot_id, network_interface, GB_sent, GB_recv, packets_sent, errors_in, errors_out, drops_in, drops_out]
        );

        res.status(201).json({
            ok: true,
            network: "Successfully sent NETWORK metrics"
        });
    } catch (err) {
        res.status(500).json({
            ok: false,
            error: "Failed to send NETWORK metrics"
        });
    } finally {
        conn.release();
    }
});

export default router;