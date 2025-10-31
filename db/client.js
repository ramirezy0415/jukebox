import pg from "pg";
const db = new pg.Client(process.env.DATABASE_URL);
export default db;

export async function insertPlaylist({ name, description }) {
  try {
    const query = `
        INSERT INTO playlists(name, description)
        VALUES ($1, $2)
        RETURNING *;
        `;
    const values = [name, description];
    const {
      rows: [playlist],
    } = await db.query(query, values);
    return playlist;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
}
export async function insertTrack({ name, duration_ms }) {
  try {
    const query = `
        INSERT INTO tracks(name, duration_ms)
        VALUES($1, $2)
        RETURNING *;
    `;
    const values = [name, duration_ms];
    const {
      rows: [track],
    } = await db.query(query, values);
    return track;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
}
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
