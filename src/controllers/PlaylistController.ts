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
