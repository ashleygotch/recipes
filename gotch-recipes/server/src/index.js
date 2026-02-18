import express from "express";
import cors from "cors";
import "dotenv/config";
import recipesRouter from "./recipes.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => res.json({ ok: true }));
app.use("/recipes", recipesRouter);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`API listening on ${PORT}`));
