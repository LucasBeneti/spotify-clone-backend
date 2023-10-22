import database from '../database';

export const getAlbum = async (album_id: number) => {
    try {
        const albumInfo = database('albums').where({ id: album_id });
        return albumInfo;
    } catch (error) {
        console.error('Error while trying to fetch song information.', error);
    }
};

export const getAlbumsByArtistId = async (artist_id: number) => {
    try {
        const artistAlbums = await database('albums').where({
            author_id: artist_id,
        });

        return artistAlbums;
    } catch (error) {
        console.error(
            'Error while trying to fetch albums for an artist.',
            error
        );
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
        const albumsAdded = await database('albums').insert(albumsToAdd);
        return albumsAdded;
    } catch (error) {
        console.error('Error while adding new albums.', error);
    }
};
