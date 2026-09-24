const bcrypt = require("bcrypt");
const { findUserByEmail, createUser } = require("../models/user.model");

const register = async (req, res) => {
    try {
        const {
            first_name,
            last_name, 
            email, 
            password, 
            phone
         } = req.body;

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(400).json({
                message: "Cet email est déjà utilisé"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const role_id = 1; // l'id du role client par défaut 

        const user = await createUser(
            role_id,
            first_name,
            last_name, 
            email, 
            hashedPassword, 
            phone

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

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await findUserByEmail(email);


        if (!user) {
            return res.status(401).json({
                message: "Email ou mot de passe incorrect"
            });
        }
        //la validation des données venus du front-end

        const isPasswordValid = await bcrypt.compare(
            password,
            user.password_hash
        );

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Email ou mot de passe incorrect"
            });
        }

        req.session.userId = user.id;
        req.session.role = user.role_id;

        return res.status(200).json({
            message: "Connexion réussie",
            user: {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                role: user.role
            }
        });

    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Erreur serveur"
        });
    }
};
const logout = (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error(error);

            return res.status(500).json({
                message: "Erreur lors de la déconnexion"
            });
        }

        res.clearCookie("connect.sid");

        return res.status(200).json({
            message: "Déconnexion réussie"
        });
    });
};

module.exports = {
    register,
    login,
    logout
};