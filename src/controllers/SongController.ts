import database from '../database';
import type { NewSong, Song } from '../contracts/types';

export const getSong = async (song_id: number) => {
    try {
        const songInfo = await database('songs').where({ id: song_id });
        return songInfo;
    } catch (error) {
        console.error('Error while trying to fetch song information.', error);
    }
};

// TODO get songs by artist_id

export const create = async (songData: NewSong[]) => {
    try {
        const songsToAdd = songData.map((song) => {
            return {
                name: song.name,
                album_id: song.album_id,
                author_id: song.author_id,
                source_link: song.source_link,
                position_on_album: song.position_on_album,
                cover_art: song.cover_art,
            };
        });
        const songAdded = await database('songs').insert(songsToAdd);
        return songAdded;
    } catch (error) {
        console.error('Error while adding new song.', error);
    }
};
