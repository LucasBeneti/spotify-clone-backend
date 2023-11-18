import database from "../database";
import { PlaylistType } from "../contracts/types";

export const getPlaylistInfoById = async (playlist_id: number) => {
  try {
    const playlistInfo = await database("playlists")
      .select(
        "playlists.name",
        "playlists.id",
        "users.username AS author_username"
      )
      .leftJoin("users", "playlists.author_id", "=", "users.clerk_user_id")
      .where("playlists.id", playlist_id);

    const fullInfo = {
      playlist_id: playlistInfo[0].id,
      cover_src:
        "https://i.scdn.co/image/ab6761610000f1788278b782cbb5a3963db88ada",
      name: playlistInfo[0].name,
      author: playlistInfo[0].author_username,
    };

    return fullInfo;
  } catch (error) {
    console.error("error", error);
  }
};

export const getPlaylistSongs = async (playlist_id: number) => {
  try {
    const songs = await database("songs")
      .select(
        "songs.name",
        "songs.id",
        "songs.author_id",
        "songs.album_id",
        "playlist_songs.added_at",
        "artists.name AS artist_name",
        "albums.name AS album_name"
      )
      .from("songs")
      .join("playlist_songs", "songs.id", "=", "playlist_songs.song_id")
      .leftJoin("artists", "artists.id", "songs.author_id")
      .leftJoin("albums", "albums.id", "songs.album_id")
      .where("playlist_songs.playlist_id", playlist_id);

    return songs;
  } catch (error) {
    console.error("Error while trying to fetch songs from playlist.", error);
  }
};

export const getPlaylistsByUserId = async (user_id: string) => {
  try {
    const playlistInfo = await database("playlists")
      .select(
        "playlists.name",
        "playlists.id",
        "playlists.updated_at",
        "users.username AS author_username"
      )
      .leftJoin("users", "playlists.author_id", "=", "users.clerk_user_id")
      .where("playlists.author_id", user_id);
    return playlistInfo;
  } catch (error) {
    console.error("error", error);
  }
};

export const create = async ({
  name,
  author_id,
  is_liked_songs_playlist,
}: PlaylistType): Promise<
  { name?: string; playlist_id?: number } | undefined
> => {
  try {
    const [createdPlaylist] = await database("playlists").insert(
      {
        name,
        author_id,
        is_liked_songs_playlist, // TODO check if this will break the feature
      },
      ["id", "name"]
    );

    return { name: createdPlaylist.name, playlist_id: createdPlaylist.id };
  } catch (error) {
    console.error("Error on CREATE playlist.", error);
  }
};

export const likePlaylist = async (playlist_id: number, user_id: number) => {
  try {
    await database("liked_playlists_users").insert({ playlist_id, user_id });
  } catch (error) {
    console.error(
      `Error while trying to like a playlsit with ID ${playlist_id}`,
      error
    );
  }
};

export const dislikePlaylist = async (playlist_id: number, user_id: number) => {
  try {
    await database("liked_playlists_users")
      .where({ playlist_id, user_id })
      .del();
  } catch (error) {
    console.error(
      `Error while trying to unlike a playlsit with ID ${playlist_id}`,
      error
    );
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

    // TODO this have to be tested yet
    await database("playlists")
      .where({ id: playlist_id })
      .update("updated_at", database.fn.now());
    return response;
  } catch (error) {
    // TODO checar de logar esse error dependendo de status, por exemplo a parada
    // de violar unique contraint meio que pode ser ignorado (apenas caso haja um bug
    // mais complexo)
    throw new Error(
      `Error while trying to add song (song ID ${song_id}) to playlist with ID ${playlist_id}. ERROR: ${error}`
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
