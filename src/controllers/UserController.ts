// TODO controller do user, onde ficarão todas as funções relacionadas a ele
// VER NA PARTE DE CONTRACTS
import database from "../database";
import type { User } from "../contracts/types";
// TODO /GET User info
export const getUserInfo = async ({ user_id }: { user_id: number }) => {
  try {
    const userInfo = await database("users").where({ id: user_id });

    return userInfo;
  } catch (error) {
    console.error("GET User error", error);
  }
};

// TODO /POST create user (don't know how much I'll use this)
export const create = async ({ username }: { username: string }) => {
  try {
    const newUser = await database("users").insert({ username });
    return newUser;
  } catch (error) {
    console.error("Error while creating user", error);
  }
};

export const deleteUser = async ({ user_id }: { user_id: number }) => {
  try {
    const deletedUser = await database("users").where({ id: user_id }).del();

    return deletedUser;
  } catch (error) {
    console.error("Error while creating user", error);
  }
};

export const followArtist = async ({
  user_id,
  artist_id,
}: {
  user_id: number;
  artist_id: number;
}) => {
  try {
    await database("user_artist_following").insert({ user_id, artist_id });
  } catch (error) {
    console.error("Error while tryng to follow an artist.", error);
  }
};

export const unfollowArtist = async ({
  user_id,
  artist_id,
}: {
  user_id: number;
  artist_id: number;
}) => {
  try {
    await database("user_artist_following").where({ user_id, artist_id }).del();
  } catch (error) {
    console.error("Error while tryng to unfollow an artist.", error);
  }
};
