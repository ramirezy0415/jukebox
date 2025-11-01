import express from "express";
const playlistsRouter = express.Router();
export default playlistsRouter;

import {
  getPlaylistById,
  getPlaylists,
  insertPlaylist,
  getTracksInPlaylistById,
} from "#db/queries/playlists";

import { insertPlaylistTrack } from "#db/queries/playlists_tracks";

playlistsRouter.get("/", async (req, res) => {
  try {
    const playlists = await getPlaylists();

    if (!playlists) {
      return res.status(404).json({ error: "No playlists found." });
    }

    return res.status(200).json(playlists);
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
});

playlistsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number(id)) {
      return res.status(400).json({ error: `Bad Request` });
    }

    const results = await getPlaylistById(id);

    if (!results) {
      return res.status(404).json({ error: `Track with ${id} was not found.` });
    }

    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
});

playlistsRouter.get("/:id/tracks", async (req, res) => {
  try {
    const { id } = req.params;

    if (!Number(id)) {
      return res.status(400).json({ error: `Bad Request` });
    }

    const results = await getTracksInPlaylistById(id);

    if (!results) {
      return res
        .status(404)
        .json({ error: "Playlist does not contain tracks." });
    }

    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
});

playlistsRouter.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ error: "Bad Request" });
    }

    const result = await insertPlaylist({ name, description });

    if (!result) {
      return res.status(400).json({ error: "Unable to insert playlist" });
    }

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
});

playlistsRouter.post("/:id/tracks", async (req, res) => {
  try {
    const { id } = req.params;
    const { track_id } = req.body;
    if (!track_id) {
      res.status(400).json({ error: "Bad Request" });
    }

    const results = await insertPlaylistTrack({ playlist_id: id, track_id });

    if (!results) {
      return res
        .status(500)
        .json({ error: "Unable to insert track into playlist." });
    }

    return res.status(200).json(results);
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
});
