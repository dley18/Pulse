const express = require("express");
import type { Request, Response, Router } from "express";
const app = express();
app.set("view engine", "ejs");
app.set("views", "./src/views");

app.get("/", (req: Request, res: Response) => {
    console.log("Hello World");
    res.render("index");
})

const cpuRouter: Router = require("./routes/cpu");
app.use("/cpu", cpuRouter);



app.listen(3000);