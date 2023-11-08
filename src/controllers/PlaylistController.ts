import database from "../database";
import { PlaylistType } from "../contracts/types";

export const getPlaylistById = async (playlist_id: number) => {
  try {
    const playlist = await database("playlists")
      .where({
        id: playlist_id,
      })
      .select("*");

    return playlist;
  } catch (error) {
    console.error("error", error);
  }
};

export const getPlaylistsByUserId = async (user_id: number) => {
  try {
    const playlists = await database("playlists").where({
      author_id: user_id,
    });
    return playlists;
  } catch (error) {
    console.error("error", error);
  }
};

export const create = async ({
  name,
  author_id,
}: PlaylistType): Promise<
  { name?: string; playlist_id?: number } | undefined
> => {
  try {
    const [createdPlaylist] = await database("playlists").insert(
      {
        name,
        author_id,
      },
      ["id", "name"]
    );

    return { name: createdPlaylist.name, playlist_id: createdPlaylist.id };
  } catch (error) {
    console.error("Error on CREATE playlist.", error);
  }
};

export const fuzzyFind = async (q: string) => {
  try {
    const playlists = await database("playlists")
      .whereRaw("name % ?", q)
      .select("id", "name", "author_id");
    return playlists;
  } catch (error) {
    console.error("Error while trying to run the fuzzy search.", error);
  }
};

export const deletePlaylist = async ({
  playlist_id,
}: {
  playlist_id: number;
}) => {
  try {
    await database("playlists").where("id", playlist_id).del();
  } catch (error) {
    console.error("Error while trying to delete a playlist.", error);
  }
};

export const addSongToPlaylist = async ({
  song_id,
  playlist_id,
}: {
  song_id: number;
  playlist_id: number;
}): Promise<{ playlist_id: number } | undefined> => {
  try {
    const [response] = await database("playlist_songs").insert(
      {
        song_id,
        playlist_id,
      },
      ["song_id", "playlist_id"]
    );
    return response;
  } catch (error) {
    throw new Error(
      `Error while trying to add song (song ID ${song_id}) to playlist with ID ${playlist_id}.`
    );
  }
};

export const deleteSongFromPlaylist = async ({
  song_id,
  playlist_id,
}: {
  song_id: number;
  playlist_id: number;
}) => {
  try {
    const deletedResponse = await database("playlist_songs")
      .where({ song_id, playlist_id })
      .del();
    return deletedResponse;
  } catch (error) {
    console.error("Error while trying to delete songs from playlist.", error);
  }
};

export const getPlaylistSongs = async (playlist_id: number) => {
  try {
    const songs = await database("songs")
      .from("songs")
      .join("playlist_songs", "songs.id", "=", "playlist_songs.song_id")
      .where("playlist_songs.playlist_id", playlist_id)
      .select("songs.name", "songs.id", "songs.author_id");

    return songs;
  } catch (error) {
    console.error("Error while trying to fetch songs from playlist.", error);
  }
};
