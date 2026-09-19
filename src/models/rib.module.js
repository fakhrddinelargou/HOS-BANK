const pool = require('../config/db');



async function getRibByCompteId(compteId) {

  const result = await pool.query('SELECT * FROM ribs WHERE account_id = $1', [compteId]);

  return result.rows[0];

}


async function createRib(compteId, iban, bic) {
  const result = await pool.query(
    'INSERT INTO ribs (account_id, iban, bic) VALUES ($1, $2, $3) RETURNING *',
    [compteId, iban, bic]
  );
  return result.rows[0];
}

module.exports = { createRib, getRibByCompteId }