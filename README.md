# Spotify Clone (Backend)

### Create database migrations

To create a database migration, just run the command below:

```shell
npx knex migrate:make <MIGRATION_NAME> -x ts
```

Just a note, the -x ts at the end is to create migration files with types by default.

### Notes

Format the front-end wants for the playlist data:

````{
  cover_src:
    "https://i.scdn.co/image/ab6761610000f1788278b782cbb5a3963db88ada",
  name: "Kenny Beats Boiler Room Barcelona",
  author: "lucasbeneti",
  liked: true,
  songs: [
    {
      name: "LUMBERJACK",
      artist: "Tyler, The Creator",
      album: "Call Me If You Get Lost",
      date_added: Date.now(),
      duration: 138,
    },
    {
      name: "LUMBERJACK",
      artist: "Tyler, The Creator",
      album: "Call Me If You Get Lost",
      date_added: Date.now(),
      duration: 138,
    },
    {
      name: "LUMBERJACK",
      artist: "Tyler, The Creator",
      album: "Call Me If You Get Lost",
      date_added: Date.now(),
      duration: 138,
    },
    {
      name: "LUMBERJACK",
      artist: "Tyler, The Creator",
      album: "Call Me If You Get Lost",
      date_added: Date.now(),
      duration: 138,
    },
  ],
}```
````
