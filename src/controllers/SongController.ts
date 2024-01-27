import database from "../database";
import type { NewSong, Song } from "../contracts/types";

export const getSong = async (song_id: number) => {
  try {
    const songInfo = await database("songs").where({ id: song_id });
    return songInfo;
  } catch (error) {
    console.error("Error while trying to fetch song information.", error);
  }
};

export const getSongsByArtistId = async (artist_id: number) => {
  try {
    const artistSongs = await database("songs")
      .where("songs.author_id", artist_id)
      .leftJoin("albums", "albums.id", "=", "songs.album_id")
      .leftJoin("artists", "artists.id", "=", "songs.author_id")
      .select(
        "songs.id",
        "songs.name",
        "songs.author_id",
        "songs.album_id",
        "songs.source_link",
        "songs.duration",
        "albums.name AS album_name",
        "albums.cover_art",
        "artists.name AS artist_name"
      )
      .limit(10);
    return artistSongs;
  } catch (error) {
    console.error("Error while trying to fetch song from an artists.", error);
  }
};

export const fuzzyFind = async (q: string) => {
  try {
    const songs = await database("songs")
      .orderByRaw("SIMILARITY(songs.name, ?) DESC", q)
      .limit(5)
      .leftJoin("artists", "artists.id", "=", "songs.author_id")
      .leftJoin("albums", "albums.id", "=", "songs.album_id")
      .select(
        "songs.id",
        "songs.name",
        "songs.author_id",
        "songs.album_id",
        "songs.source_link",
        "songs.duration",
        "artists.name AS artist_name",
        "albums.name AS album_name",
        "albums.cover_art"
      );
    return songs;
  } catch (error) {
    console.error("Error while trying to run the fuzzy search.", error);
  }
};

export const create = async (songData: NewSong[]) => {
  try {
    const songsToAdd = songData.map((song) => {
      return {
        name: song.name,
        album_id: song.album_id,
        author_id: song.author_id,
        source_link: song.source_link,
        position_on_album: song.position_on_album,
        cover_art: song.cover_art,
      };
    });
    const songAdded = await database("songs").insert(songsToAdd);
    return songAdded;
  } catch (error) {
    console.error("Error while adding new song.", error);
  }
};

export default { fuzzyFind, create, getSong, getSongsByArtistId };
