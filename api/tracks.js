import express from "express";
const tracksRouter = express.Router();
export default tracksRouter;

import { getTracks, getTracksById } from "#db/queries/tracks";

tracksRouter.get("/", async (req, res) => {
  try {
    const tracks = await getTracks();

    if (!tracks) {
      return res.status(404).json({ error: "Tracks not found." });
    }

    return res.status(200).json(tracks);
  } catch (error) {
    console.error(error);
  }
});

tracksRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number(id)) {
      return res.status(400).json({ error: `Bad Request` });
    }

    const tracks = await getTracksById(id);

    if (!tracks) {
      return res.status(404).json({ error: `Track with id ${id} not found.` });
    }

    return res.status(200).json(tracks);
  } catch (error) {
    console.error(error);
  }
});
