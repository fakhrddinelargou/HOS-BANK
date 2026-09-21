const pool = require("../config/database");

const createComplaint = async (
    clientId,
    subject,
    description,
    priority
) => {
    const result = await pool.query(
        `INSERT INTO complaints (
            client_id,
            subject,
            description,
            priority
        )
        VALUES ($1, $2, $3, $4)
        RETURNING
            id,
            client_id,
            assigned_agent_id,
            subject,
            description,
            status,
            priority,
            created_at`,
        [
            clientId,
            subject,
            description,
            priority
        ]
    );

    return result.rows[0];
};

const findComplaintsByClient = async (clientId) => {
    const result = await pool.query(
        `
        SELECT * FROM complaints
        WHERE client_id = $1
        ORDER BY created_at DESC
        `,
        [clientId]
    );

    return result.rows;
};

const findComplaintById = async (id, clientId) => {
    const result = await pool.query(
        `
        SELECT * FROM complaints
        WHERE id = $1
        AND client_id = $2
        `,
        [id, clientId]
    );

    return result.rows[0];
};

module.exports = {
    createComplaint,
    findComplaintsByClient,
    findComplaintById
};