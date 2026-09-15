const pool = require("../config/database");

// Le $1 correspond au premier paramètre que tu fournis à pool.query() : [email]
const findUserByEmail = async (email) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    return result.rows[0];
};

const createUser = async(firstName, lastName, email, passwored){
    const result = await pool.query(
        `
        INSERT INTO users (first_name, last_name, email, password)
        VALUES ($1, $2, $3, $4)
        RETURNING id, firs_name, last_name, email, role, email_verified
        `,
        [firstName, lastName, email, passwored]
         );
         return result.rows[0];

}

module.exports = {
    findUserByEmail,
    createUser
};