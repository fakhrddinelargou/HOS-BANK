const pool = require("../config/database");

// Le $1 correspond au premier paramètre que tu fournis à pool.query() : [email]
const findUserByEmail = async (email) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    return result.rows[0];
};

module.exports = {
    findUserByEmail
};