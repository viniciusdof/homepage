import type { APIRoute } from "astro";
import { env } from "cloudflare:workers";

export const GET: APIRoute = async () => {
  try {
    const db = (env as any).guestbook_db;

    if (db) {
      const { results } = await db
        .prepare("SELECT * FROM entries ORDER BY id DESC LIMIT 50")
        .all();

      return new Response(JSON.stringify(results), { status: 200 });
    }

    return new Response(
      JSON.stringify([
        {
          id: 1,
          name: "VDoF Bot",
          msg: "Welcome! Configure Cloudflare D1 to persist real messages! :-)",
          date: "Today",
          color: "#336698",
        },
      ]),
      { status: 200 },
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch entries" }), { status: 500 });
  }
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, msg, color } = body;

    const db = (env as any).guestbook_db;
    const date = new Date().toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });

    if (db) {
      await db
        .prepare("INSERT INTO entries (name, msg, color, date) VALUES (?, ?, ?, ?)")
        .bind(name, msg, color, date)
        .run();

      return new Response(JSON.stringify({ success: true }), { status: 201 });
    }

    return new Response(JSON.stringify({ success: true, mock: true }), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to save entry" }), { status: 500 });
  }
};
