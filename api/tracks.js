import express from "express";
const tracksRouter = express.Router();
export default tracksRouter;

import { getTracks, getTracksById } from "#db/queries/tracks";

tracksRouter.get("/", async (req, res) => {
  try {
    console.log("Retrieving all tracks");
    const tracks = await getTracks();
    res.status(200).json(tracks);
  } catch (error) {
    console.error(error);
  }
});

tracksRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Retrieving track with id: ", id);
    const tracks = await getTracksById(id);
    res.status(200).json(tracks);
  } catch (error) {
    console.error(error);
  }
});
