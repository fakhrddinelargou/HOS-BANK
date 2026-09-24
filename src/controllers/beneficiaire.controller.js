const { name } = require('ejs');
const { getBeneficiairesByClientId, getBeneficiaireById, create, update, deleteBeneficiaire } = require('../models/beneficiaries.model');
const {createBeneficiariesSchema} = require('../validations/beneficiare.validation');

async function createBeneficiaries(req, res) {

    const userId = req.session.userId;
    
    const rst = createBeneficiariesSchema.safeParse(req.body);

    if (!rst.success) {
        const firstMessage = rst.error.issues?.[0]?.message;
        return res.status(400).json({ error: firstMessage });
    }


    const data = req.body;

    if (!userId) {
        return res.status(400).json({ error: "Invalid DATA" })
    }

    const result = await create(userId, data);

    if (!result) {
        return res.status(401).json({ error: "Invalid DATA" })
    }

    return res.status(201).json({ success: "Beneficiaries created successful" });

}


module.exports = { createBeneficiaries };