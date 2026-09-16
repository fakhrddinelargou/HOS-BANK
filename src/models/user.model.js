const pool = require("../config/database");

// Le $1 correspond au premier paramètre que tu fournis à pool.query() : [email]
const findUserByEmail = async (email) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    return result.rows[0];
};

const createUser = async (firstName, lastName, email, password) => {
    const result = await pool.query(
        `INSERT INTO users (first_name, last_name, email, password)
         VALUES ($1, $2, $3, $4)
         RETURNING id, first_name, last_name, email, role, email_verified`,
        [firstName, lastName, email, password]
        // Après l'insertion, PostgreSQL nous renvoie les informations du nouvel utilisateur
    );

    return result.rows[0];
};

module.exports = {
    findUserByEmail,
    createUser
};