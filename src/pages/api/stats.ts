import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ locals, url }) => {
  try {
    const db = (locals as any).runtime?.env?.guestbook_db;
    const shouldIncrement = url.searchParams.get("inc") === "true";

    if (db) {
      await db.prepare("INSERT OR IGNORE INTO stats (key, value) VALUES ('visitors', 0)").run();

      if (shouldIncrement) {
        await db.prepare("UPDATE stats SET value = value + 1 WHERE key = 'visitors'").run();
      }

      const result = await db.prepare("SELECT value FROM stats WHERE key = 'visitors'").first();

      return new Response(JSON.stringify({ visitors: result?.value || 0 }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ visitors: 1337, mock: true }), {
      status: 200,
      headers: { "content-type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch stats" }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }
};
