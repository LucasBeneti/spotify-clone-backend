import database from "../database";

export const fuzzyFind = async (q: string) => {
  try {
    const artists = await database("artists")
      .whereRaw("? % ANY(STRING_TO_ARRAY(artists.name, ' '));", q)
      .select("artists.id", "artists.name");

    return artists;
  } catch (error) {
    console.error("Error while trying to fuzzy find the artists.", error);
  }
};

export default { fuzzyFind };
