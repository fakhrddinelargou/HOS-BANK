const bcrypt = require("bcrypt");
const { findUserByEmail, createUser } = require("../models/userModel");

const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                message: "Cet email est déjà utilisé"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await createUser(
            firstName,
            lastName,
            email,
            hashedPassword
        );

        res.status(201).json({
            message: "Utilisateur créé avec succès",
            user
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Erreur serveur"
        });
    }
};

module.exports = {
    register
};