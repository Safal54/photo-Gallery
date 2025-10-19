import { neon } from '@netlify/neon';

export async function handler() {
  const sql = neon();

  try {
    const rows = await sql`SELECT url FROM images ORDER BY uploaded_at DESC`;
    const urls = rows.map(r => r.url);

    return {
      statusCode: 200,
      body: JSON.stringify(urls),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch images" }),
    };
  }
}
