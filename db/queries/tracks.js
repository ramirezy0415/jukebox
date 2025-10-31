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
