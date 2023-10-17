// Contract descriptions

// TODO GET /api/search
/*
Objective: general search for the term in hand. Probably I'll attempt to do a fuzzy search
for all at once, but if it turns out to be not efficient, I'll probably separate the requests,
that is because even though it would be basically a copy and paste between the three types of
information I want, but the call could be used separately between them, making use of filters
and things like that.

input => searchTerm: string
 * returns => {
  songs: [
    {
      id: string,
      name: string,
      author: string,
      album: string,
      cover: string (fixed image size, may not be too big),
    }
  ],
  artists: [
    {
      id: string,
      name: string,
      ...information (can't remember at the moment)
    }
  ],
  playlists: [
    {
      id: string,
      name: string,
      author: string,
      songs: string[] (array de ids ou literalmente de musicas??)
    }
  ],
 }
 */

// TODO /POST Create Playlist
/**
 * Objective: Create an empty playlist and be able to add songs to it.
 * input=> {playlistName: string, playlistAuthor: string (self ID)}
 * output => {status: number | string, message: string, playlistId: string}
 *
 * After the playlist is created, it would be cool to return its ID, if the user wants to use that for something.
 */

// TODO /DELETE Playlists
/*
Objective: Enable the user to delete playlists
 input => playlistId: stringl
 returns => playlist deletion status
*/

// TODO /GET User info
/*
Objective: Return user information like who's following him (other users), who he follows (artists), playlists he owns.
There's some more details that I probably can fetch from the auth provider.
*/

// TODO /POST Follow artist/user
/**
 * Objective: enable the user to follow specific artists and even other users.
 */
