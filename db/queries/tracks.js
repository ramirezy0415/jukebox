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
