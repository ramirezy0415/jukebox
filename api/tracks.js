import express from "express";
const tracksRouter = express.Router();
export default tracksRouter;

import { getTracks } from "#db/queries/tracks";

tracksRouter.get("/", async (req, res) => {
  try {
    console.log("Retrieving all tracks");
    const tracks = await getTracks();
    res.status(200).json(tracks);
  } catch (error) {
    console.error(error);
  }
});
