import { neon } from '@netlify/neon';

export async function handler(event) {
  const sql = neon();

  try {
    const { url } = JSON.parse(event.body);

    await sql`
      INSERT INTO images (url) VALUES (${url})
    `;

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to save image" }),
    };
  }
}
