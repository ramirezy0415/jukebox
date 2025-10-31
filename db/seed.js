import db from "#db/client";
import { insertPlaylist, insertTrack, insertPlaylistTrack } from "#db/client";
await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  // 10 Playlists
  const playlistData = [
    {
      name: "Morning Coffee Jams",
      description: "Relaxing acoustic tunes for a gentle start.",
    },
    {
      name: "Workout Hits 2024",
      description: "High-energy EDM and pop for the gym.",
    },
    {
      name: "80s Synthwave Chill",
      description: "Vaporwave and retro electronic vibes.",
    },
    {
      name: "Classical Study Focus",
      description: "Baroque and minimal classical pieces.",
    },
    {
      name: "Road Trip Anthems",
      description: "Sing-along rock and indie tracks.",
    },
    {
      name: "Deep House Grooves",
      description: "Late-night four-on-the-floor beats.",
    },
    {
      name: "Acoustic Covers",
      description: "Stripped-down versions of popular songs.",
    },
    {
      name: "Gaming Lofi",
      description: "Mellow beats for late-night gaming sessions.",
    },
    {
      name: "Jazz Classics",
      description: "Timeless swing and blues standards.",
    },
    {
      name: "Indie Discoveries",
      description: "Newly released tracks from up-and-coming artists.",
    },
  ];

  // 20 Tracks
  const trackData = [
    { name: "Sunrise Serenade", duration_ms: 220000 }, // 1
    { name: "Adrenaline Rush", duration_ms: 185000 }, // 2
    { name: "Digital Dream", duration_ms: 310000 }, // 3
    { name: "Cello Suite No. 1", duration_ms: 250000 }, // 4
    { name: "Highway Drive", duration_ms: 295000 }, // 5
    { name: "Rhythmic Descent", duration_ms: 330000 }, // 6
    { name: "Wonderwall (Acoustic)", duration_ms: 260000 }, // 7
    { name: "Pixel Sunset", duration_ms: 190000 }, // 8
    { name: "Take Five", duration_ms: 212000 }, // 9
    { name: "New Wave Echo", duration_ms: 245000 }, // 10
    { name: "Quiet Moment", duration_ms: 150000 }, // 11
    { name: "Power Up", duration_ms: 175000 }, // 12
    { name: "Arcade Glow", duration_ms: 300000 }, // 13
    { name: "Clair de Lune", duration_ms: 410000 }, // 14
    { name: "Coastline Cruise", duration_ms: 280000 }, // 15
    { name: "Baseline Shift", duration_ms: 320000 }, // 16
    { name: "Bohemian Rhapsody (Cover)", duration_ms: 350000 }, // 17
    { name: "Zen Garden", duration_ms: 205000 }, // 18
    { name: "Satin Doll", duration_ms: 235000 }, // 19
    { name: "Uncharted Territory", duration_ms: 270000 }, // 20
  ];

  try {
    console.log("Starting database seeding...");

    // --- 2. SEED PLAYLISTS AND TRACKS ---

    console.log("Inserting 10 playlists...");
    for (let i = 0; i < playlistData.length - 1; i++) {
      let playlist = playlistData[i];
      await insertPlaylist(playlist);
    }

    console.log("Inserting 20 tracks...");
    for (let i = 0; i < trackData.length - 1; i++) {
      let track = trackData[i];
      await insertTrack(track);
    }

    // --- 3. SEED PLAYLISTS_TRACKS (Links) ---

    // Use the IDs from the created objects to create the links.

    const linksToCreate = [
      // Morning Coffee Jams (Playlist 1)
      { playlist_id: 1, track_id: 1 }, // P1: Sunrise Serenade (T1)
      { playlist_id: 1, track_id: 10 }, // P1: Quiet Moment (T11)
      { playlist_id: 1, track_id: 17 }, // P1: Zen Garden (T18)

      // Workout Hits 2024 (Playlist 2)
      { playlist_id: 2, track_id: 1 }, // P2: Adrenaline Rush (T2)
      { playlist_id: 2, track_id: 11 }, // P2: Power Up (T12)

      // 80s Synthwave Chill (Playlist 3)
      { playlist_id: 3, track_id: 2 }, // P3: Digital Dream (T3)
      { playlist_id: 3, track_id: 12 }, // P3: Arcade Glow (T13)

      // Classical Study Focus (Playlist 4)
      { playlist_id: 4, track_id: 3 }, // P4: Cello Suite No. 1 (T4)
      { playlist_id: 4, track_id: 13 }, // P4: Clair de Lune (T14)

      // Road Trip Anthems (Playlist 5)
      { playlist_id: 5, track_id: 4 }, // P5: Highway Drive (T5)
      { playlist_id: 5, track_id: 14 }, // P5: Coastline Cruise (T15)

      // Deep House Grooves (Playlist 6)
      { playlist_id: 6, track_id: 5 }, // P6: Rhythmic Descent (T6)
      { playlist_id: 6, track_id: 15 }, // P6: Baseline Shift (T16)

      // Jazz Classics (Playlist 9) - Cross-linking tracks to show some tracks in multiple playlists
      { playlist_id: 7, track_id: 8 }, // P9: Take Five (T9)
      { playlist_id: 7, track_id: 18 }, // P9: Satin Doll (T19)
    ];

    console.log(`Inserting ${linksToCreate.length} playlist-track links...`);
    for (let i = 0; i < linksToCreate.length - 1; i++) {
      let link = linksToCreate[i];
      await insertPlaylistTrack(link);
    }
  } catch (error) {
    console.error(error);
  }
}
