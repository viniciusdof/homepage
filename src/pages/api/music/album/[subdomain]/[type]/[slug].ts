import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ params }) => {
  const { subdomain, type, slug } = params;

  if (!subdomain || !type || !slug) {
    return new Response(JSON.stringify({ error: "Missing parameters" }), { status: 400 });
  }

  try {
    const targetUrl = `https://bandfeed.viniciusdof.com/v1/band/${subdomain}/${type}/${slug}`;
    const response = await fetch(targetUrl);
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch album info from Bandfeed" }), {
      status: 500,
    });
  }
};
