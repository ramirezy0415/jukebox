import express from "express";
const playlistsRouter = express.Router();
export default playlistsRouter;

import {
  getPlaylistById,
  getPlaylists,
  insertPlaylist,
  getTracksInPlaylistById,
} from "#db/queries/playlists";

playlistsRouter.get("/", async (req, res) => {
  try {
    const results = await getPlaylists();
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
});

playlistsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await getPlaylistById(id);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
});

playlistsRouter.get("/:id/tracks", async (req, res) => {
  try {
    const { id } = req.params;
    const results = await getTracksInPlaylistById(id);
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
});

playlistsRouter.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      res.status(400).json({ error: "Bad Request" });
    }

    const result = await insertPlaylist({ name, description });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
});
