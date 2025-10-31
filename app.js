import express from "express";
const app = express();
export default app;

import tracksRouter from "#api/tracks";

app.use(express.json());
app.use("/tracks", tracksRouter);
