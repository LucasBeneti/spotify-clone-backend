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

### Auth implementation

The auth implementation is pretty straight forward. We only need to register the `clerkPlugin` on the top-level server file and we're good to use the auth wherever. One small detail was that, at first I was trying to implement the auth check on `onResponse` hook, but turns out specifically this hook was too high up in the lifecycle tree, so the it appeared that before the plugin registering took place, the `onResponse` hook was already being called and it was throwing an error saying the register should happen before the auth function use. So I added the auth verification on another hook, called `preHandler`, that would be called right after the validation and parsing of the request, but before the handler for the request. Just like the code snippet below:

```typescript
  export async function playlistRoutes(fastify: FastifyInstance) {
    fastify.addHook("preHandler", async (request, reply) => {
      const { userId } = getAuth(request);
      if (!userId) {
        reply.status(401).send({ erroMessage: "Unauthorized." });
      }
    });

  // rest of the playlist routes...
```
