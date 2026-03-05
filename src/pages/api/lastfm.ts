import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ locals }) => {
  const env = (locals as any).runtime?.env;
  const LASTFM_API_KEY = env?.LASTFM_API_KEY || import.meta.env.LASTFM_API_KEY;
  const LASTFM_USER = "viniciusdof";

  if (!LASTFM_API_KEY) {
    return new Response(JSON.stringify({ error: "API Key not configured" }), { status: 500 });
  }

  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${LASTFM_USER}&api_key=${LASTFM_API_KEY}&format=json&limit=1`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      throw new Error(data.message);
    }
    if (!data.recenttracks?.track?.[0]) {
      throw new Error("No tracks found");
    }

    const track = data.recenttracks.track[0];
    return new Response(
      JSON.stringify({
        name: track.name,
        artist: typeof track.artist === "string" ? track.artist : track.artist["#text"],
        album: typeof track.album === "string" ? track.album : track.album["#text"],
        image: track.image[1]["#text"] || track.image[0]["#text"],
        nowPlaying: track["@attr"]?.nowplaying === "true",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=60",
        },
      },
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch" }), { status: 500 });
  }
};
