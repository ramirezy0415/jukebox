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
