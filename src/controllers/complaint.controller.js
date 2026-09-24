const {
    createComplaint,
    findComplaintsByClient,
    findComplaintById
} = require("../models/complaint.model");

const create = async (req, res) => {
    try {
        const { subject, description, priority } = req.body;

        const clientId = req.session.userId;

        const complaint = await createComplaint(
            clientId,
            subject,
            description,
            priority
        );

        return res.status(201).json({
            message: "Réclamation créée avec succès",
            complaint
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Erreur serveur"
        });
    }
};

const getAll = async (req, res) => {
    try {
        const clientId = req.session.userId;

        const complaints = await findComplaintsByClient(clientId);

        return res.status(200).json({
            complaints
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Erreur serveur"
        });
    }
};

const getOne = async (req, res) => {
    try {
        const { id } = req.params;
        const clientId = req.session.userId;

        const complaint = await findComplaintById(id, clientId);

        if (!complaint) {
            return res.status(404).json({
                message: "Réclamation introuvable"
            });
        }

        return res.status(200).json({
            complaint
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Erreur serveur"
        });
    }
};

module.exports = {
    create,
    getAll,
    getOne
};