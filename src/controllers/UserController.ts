import database from "../database";
import type { User } from "../contracts/types";

export const getUserInfo = async (username: string) => {
  try {
    const userInfo = await database("users").where({ username });

    return userInfo;
  } catch (error) {
    console.error("GET User error", error);
  }
};

// This is the call to do every time a user logs in
export const create = async (newUserDTO: {
  username: string;
  clerkUserId: string;
}) => {
  try {
    const existingUser = await database("users")
      .select("clerk_user_id", "last_login")
      .where({ username: newUserDTO.username })
      .first();

    if (!existingUser) {
      const newUser = await database("users").insert({
        username: newUserDTO.username,
        clerk_user_id: newUserDTO.clerkUserId,
        last_login: database.fn.now(),
      });
      return newUser;
    } else {
      return { message: "User already exists." };
    }
  } catch (error) {
    console.error("Error while creating user", error);
  }
};

export const deleteUser = async (user_id: string) => {
  try {
    const deletedUser = await database("users")
      .where({ clerk_user_id: user_id })
      .del();

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
