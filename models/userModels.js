import { query } from "../db.js";

export async function createUser(fullname, email, password) {
  const result = await query(
    `INSERT INTO users (fullname, email, password)
     VALUES ($1, $2, $3)
     RETURNING id, fullname, email, created_at`,
    [fullname, email, password]
  );
  return result.rows[0];
}

export async function getUsers() {
  const result = await query("SELECT id, fullname, email, created_at FROM users");
  return result.rows;
}

export async function getUserByEmail(email) {
  const result = await query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
}
