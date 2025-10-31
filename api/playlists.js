import express from "express";
const playlistsRouter = express.Router();
export default playlistsRouter;

import { getPlaylists } from "#db/queries/playlists";

playlistsRouter.get("/", async (req, res) => {
  try {
    const results = await getPlaylists();
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
});
