import { POSTGRES_URL } from '$env/static/private';
import { createPool } from '@vercel/postgres';

export const pool = createPool({ connectionString: POSTGRES_URL });
