import database from '../database';
import { PlaylistType } from '../contracts/types';

export const listByUserId = async ({ user_id }: { user_id: number }) => {
    try {
        const playlists = await database('playlists').where({
            author_id: user_id,
        });
        return playlists;
    } catch (error) {
        console.error('error', error);
    }
};

export const create = async ({ name, author_id }: PlaylistType) => {
    try {
        await database('playlists').insert({
            name,
            author_id,
        });
    } catch (error) {
        console.error('Error while trying to create new playlist.', error);
    }
};

export const deletePlaylist = async ({
    playlist_id,
}: {
    playlist_id: number;
}) => {
    try {
        await database('playlists').where('id', playlist_id).del();
    } catch (error) {
        console.error('Error while trying to delete a playlist.', error);
    }
};

export const addSongToPlaylist = async ({
    song_id,
    playlist_id,
}: {
    song_id: number;
    playlist_id: number;
}) => {
    try {
        const response = database('playlist_songs').insert({
            song_id,
            playlist_id,
        });
        return response;
    } catch (error) {
        console.error('Error while trying to add song to playlist.', error);
    }
};

// TODO get all songs in a specific playlist by id
export const getPlaylistSongs = async (playlist_id: number) => {
    try {
        const songs = await database('songs')
            .join('playlist_songs', 'songs.id', '=', 'playlist_songs.song_id')
            .select('songs.name', 'songs.id', 'songs.author.id');

        return songs;
    } catch (error) {}
};
