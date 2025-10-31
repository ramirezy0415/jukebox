-- RESTART DATABASE
TRUNCATE TABLE 
    playlists, 
    tracks,
    playlists_tracks
RESTART IDENTITY 
CASCADE;

-- CREATE REQUIRED SCHEMAS
CREATE TABLE playlists (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL
);

CREATE TABLE tracks(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    duration_ms INTEGER NOT NULL
);

CREATE TABLE playlists_tracks(
    id SERIAL PRIMARY KEY,
    playlist_id INTEGER NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
    track_id INTEGER NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
    CONSTRAINT unique_track_playlist UNIQUE (playlist_id, track_id)
);