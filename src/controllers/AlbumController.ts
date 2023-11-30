import database from "../database";

export const getAlbum = async (album_id: number) => {
  try {
    const albumInfo = database("albums")
      .leftJoin("artists", "albums.author_id", "=", "artists.id")
      .where("albums.id", album_id)
      .select(
        "albums.cover_art",
        "albums.name",
        "albums.author_id",
        "albums.launch_date",
        "artists.name as author_name"
      )
      .first();

    return albumInfo;
  } catch (error) {
    console.error("Error while trying to fetch song information.", error);
  }
};

export const getAlbumSongsById = async (album_id: number) => {
  try {
    const albumSongs = database("songs")
      .from("songs")
      .join("albums", "albums.id", "=", "songs.album_id")
      .leftJoin("artists", "artists.id", "=", "songs.author_id")
      .where("albums.id", album_id)
      .select(
        "songs.name",
        "songs.id",
        "songs.author_id",
        "songs.position_on_album",
        "songs.source_link",
        "artists.name AS artist_name",
        "albums.cover_art"
      );

    return albumSongs;
  } catch (error) {
    console.error(
      "Error while trying to fetch songs from specific album.",
      error
    );
  }
};

export const getAlbumsByArtistId = async (artist_id: number) => {
  try {
    const artistAlbums = await database("albums").where({
      author_id: artist_id,
    });

    return artistAlbums;
  } catch (error) {
    console.error("Error while trying to fetch albums for an artist.", error);
  }
};

export const fuzzyFind = async (q: string) => {
  try {
    const albums = database("albums")
      .whereRaw("? % ANY(STRING_TO_ARRAY(albums.name, ' '));", q)
      .leftJoin("artists", "artists.id", "=", "albums.author_id")
      .select(
        "albums.id",
        "albums.name",
        "albums.author_id",
        "albums.launch_date",
        "artists.name AS author_name"
      );
    return albums;
  } catch (error) {
    console.error("Error while trying to run the fuzzy search.", error);
  }
};

type NewAlbum = {
  name: string;
  author_id: number;
  launch_year: number;
};
export const create = async (albums: NewAlbum[]) => {
  try {
    const albumsToAdd = albums.map((album) => {
      return {
        name: album.name,
        author_id: album.author_id,
        launch_year: album.launch_year,
      };
    });
    const albumsAdded = await database("albums").insert(albumsToAdd);
    return albumsAdded;
  } catch (error) {
    console.error("Error while adding new albums.", error);
  }
};

export default {
  getAlbum,
  getAlbumSongsById,
  getAlbumsByArtistId,
  fuzzyFind,
  create,
};
