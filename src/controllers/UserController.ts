import database from "../database";
import type { User } from "../contracts/types";
import * as PlaylistController from "./PlaylistController";

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

      // creating the Liked songs playlist (every user has one)
      await PlaylistController.create({
        name: "Liked Songs",
        author_id: newUserDTO.clerkUserId,
        is_liked_songs_playlist: true,
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

export const likeSong = async (song_id: number, user_id: string) => {
  try {
    const playlistInfo = await database("playlists")
      .where({
        author_id: user_id,
        is_liked_songs_playlist: true,
      })
      .select("playlists.id")
      .first();

    if (playlistInfo) {
      const likeResponse = await PlaylistController.addSongToPlaylist({
        song_id,
        playlist_id: playlistInfo.id,
      });

      return likeResponse;
    }
    return { errorMessage: "Unable to like song. Please, try again latter." };
  } catch (error) {
    console.error("Error while trying to like song.", error);
  }
};

export const dislikeSong = async (song_id: number, user_id: string) => {
  try {
    const playlistInfo = await database("playlists")
      .where({
        author_id: user_id,
        is_liked_songs_playlist: true,
      })
      .select("playlists.id")
      .first();

    if (playlistInfo) {
      const dislikeResponse = await PlaylistController.deleteSongFromPlaylist({
        song_id,
        playlist_id: playlistInfo.id,
      });

      return dislikeResponse;
    }
    return {
      errorMessage: "Unable to dislike song. Please, try again latter.",
    };
  } catch (error) {
    console.error("Error while trying to like song.", error);
  }
};

export default {
  getUserInfo,
  create,
  deleteUser,
  followArtist,
  unfollowArtist,
  likeSong,
  dislikeSong,
};
