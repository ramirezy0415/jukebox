import db from "#db/client";

export async function getPlaylists() {
  try {
    const query = `SELECT * FROM playlists;`;
    const { rows: playlists } = await db.query(query);
    return playlists;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
}

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
