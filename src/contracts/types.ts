export type PlaylistType = {
  name: string;
  author_id: string;
  description?: string;
  is_liked_songs_playlist?: boolean;
};
export type User = {
  id: string;
  username: string;
  playlists?: PlaylistType[];
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
  author_id: number;
  album_id?: number;
  source_link: string;
  position_on_album?: number;
  cover_art?: string;
};

export type NewSong = {
  name: string;
  author_id: number;
  album_id: number;
  source_link: string;
  position_on_album: number;
  cover_art?: string;
};
