import express from "express";
import cors from "cors";
import Pool from "pg";
import dotenv from "dotenv";
import type { Request, Response, Router } from "express";

import { router as dbRouter, initDB } from "./db/db.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.set("view engine", "ejs");
app.set("views", "./views");

app.get("/", (req: Request, res: Response) => {
    console.log("Hello World");
    res.render("index");
});

initDB();

import cpuRouter from "./routes/cpu.js";
app.use("/cpu", cpuRouter);
app.use("/db", dbRouter);
import snapshotRouter from "./routes/snapshot.js";
app.use("/snapshot", snapshotRouter);
import batteryRouter from "./routes/battery.js";
app.use("/battery", batteryRouter);
import diskRouter from "./routes/disk.js";
app.use("/disk", diskRouter);
import gpuRouter from "./routes/gpu.js";
app.use("/gpu", gpuRouter);
import memoryRouter from "./routes/memory.js";
app.use("/memory", memoryRouter);
import networkRouter from "./routes/network.js";
app.use("/network", networkRouter);


app.listen(3000, () => {console.log("Pulse Server started on Port: 3000")});