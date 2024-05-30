import { Pool } from 'pg'
const { DB_USER, DB_PASSWORD, DB_ADDRESS, DB } = process.env

export const pgConnection = new Pool({
  database: DB,
  user: DB_USER,
  password: DB_PASSWORD,
  host: DB_ADDRESS,
  port: 5432
})
