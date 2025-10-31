import db from "#db/client";

export async function insertPlaylistTrack({ playlist_id, track_id }) {
  try {
    const query = `
        INSERT INTO playlists_tracks(playlist_id, track_id)
        VALUES($1, $2)
        RETURNING *;`;
    const values = [playlist_id, track_id];
    const {
      rows: [playlist_track],
    } = await db.query(query, values);
    return playlist_track;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
}
