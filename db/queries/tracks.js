import db from "#db/client";

export async function getTracks() {
  try {
    const query = `SELECT * FROM tracks`;
    const { rows: tracks } = await db.query(query);
    return tracks;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
}

export async function getTracksById(id) {
  try {
    const query = `SELECT * FROM tracks WHERE id = $1`;
    const values = [id];
    const {
      rows: [track],
    } = await db.query(query, values);
    return track;
  } catch (error) {
    console.error(error);
    throw Error(error);
  }
}
