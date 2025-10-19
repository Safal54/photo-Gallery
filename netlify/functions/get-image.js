// netlify/functions/get-images.js
import { neon } from '@neondatabase/serverless';

export async function handler(event) {
  // Handle CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      },
      body: ''
    };
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    const rows = await sql`SELECT url FROM images ORDER BY uploaded_at DESC`;
    const urls = rows.map(r => r.url);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(urls),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: "Failed to fetch images" }),
    };
  }
}