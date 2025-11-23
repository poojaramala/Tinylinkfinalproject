

import pool from "../db/index.js";


export const createLink = async (code, original_url) => {
  const result = await pool.query(
    `INSERT INTO links (code, original_url)
     VALUES ($1, $2)
     RETURNING *`,
    [code, original_url]
  );
  return result.rows[0];
};


export const findLinkByCode = async (code) => {
  const result = await pool.query(
    `SELECT * FROM links WHERE code = $1`,
    [code]
  );
  return result.rows[0];
};


export const getAllLinks = async () => {
  const result = await pool.query(
    `SELECT * FROM links ORDER BY created_at DESC`
  );
  return result.rows;
};


export const deleteLink = async (code) => {
  await pool.query(
    `DELETE FROM links WHERE code = $1`,
    [code]
  );
};


export const incrementClick = async (code) => {
  await pool.query(
    `UPDATE links
     SET clicks = clicks + 1,
         last_clicked = NOW()
     WHERE code = $1`,
    [code]
  );
};