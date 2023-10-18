export type Playlist = {
    name: string;
    author: string;
};
export type User = {
    id: string;
    username: string;
    playlists?: Playlist[];
    following?: Artist[] | User[];
};

export type Artist = {
    id: string;
    name: string;
    albums?: Album[];
};

export type Album = {
    id: string;
    name: string;
    author: Artist;
    tracks: Song[];
};

export type Song = {
    id: string;
    name: string;
    author: Artist;
    album?: Album;
    song_link: string;
    position_on_album?: number;
    cover_art?: string;
};
