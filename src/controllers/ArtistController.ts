import database from "../database";

export const getArtistInfoById = async (artistId: number) => {
  try {
    const [artists] = await database("artists")
      .where("artists.id", artistId)
      .select("artists.id", "artists.name", "artists.page_cover_img");

    return artists;
  } catch (error) {
    console.error("Error while trying to fetch artist data", error);
  }
};

export const fuzzyFind = async (q: string) => {
  try {
    const artists = await database("artists")
      .orderByRaw("SIMILARITY(artists.name, ?) DESC", q)
      .select("artists.id", "artists.name", "artists.profile_image");

    return artists;
  } catch (error) {
    console.error("Error while trying to fuzzy find the artists.", error);
  }
};

export default { getArtistInfoById, fuzzyFind };
