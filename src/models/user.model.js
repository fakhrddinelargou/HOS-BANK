const pool = require("../config/db");

// Le $1 correspond au premier paramètre que tu fournis à pool.query() : [email]
const findUserByEmail = async (email) => {
    const result = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [email]
    );

    return result.rows[0];
};
       

const createUser = async (
        role_id,
        first_name,
        last_name, 
        email, 
        password_hash, 
        phone
    ) => {
    const result = await pool.query(
        `INSERT INTO users (
            role_id,
            first_name, 
            last_name, 
            email, 
            password_hash,
            phone
            )
        VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING 
            id,                 
            role_id,            
            first_name,         
            last_name,          
            email,   
            phone,              
            email_verified,     
            verification_token, 
            status,             
            created_at         
            `,
        [
            role_id,
            first_name, 
            last_name, 
            email, 
            password_hash,
            phone
        ]
        // Après l'insertion, PostgreSQL nous renvoie les informations du nouvel utilisateur
    );

    return result.rows[0];
};

module.exports = {
    findUserByEmail,
    createUser
};