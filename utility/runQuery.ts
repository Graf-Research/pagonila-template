require('dotenv').config();
import { Pool, PoolClient } from "pg";

export async function runQuery(query: string): Promise<{ rows: { [column: string]: any } }> {
  const pool = new Pool({
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST ?? '',
    port: +(process.env.DB_PORT ?? '80'),
    database: process.env.DB_NAME,
  });

  let client: PoolClient | null = null;
  try {
    client = await pool.connect();
    return await client.query(query);
  } catch (err: any) {
    throw err;
  } finally {
    client?.release();
  }
}
