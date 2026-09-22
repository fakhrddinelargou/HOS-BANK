const { name } = require('ejs');
const { getBeneficiairesByClientId, getBeneficiaireById, create, update, deleteBeneficiaire } = require('../models/beneficiaries.model');
const z = require('zod');


const schema = z.object({
    name: z.string().min(3).max(225).regex(/^[a-zA-Z\s]+$/, { message: "Name must contain only letters" }),
    iban: z.string().min(28).max(28),
    bank_name: z.string().min(3).max(225)
})

async function createBeneficiaries(req, res) {

    console.log("Session after set:", req.sessionID);
    // console.log(req.session);
    
    
    // const rst = schema.safeParse(req.body);

    // if (!rst.success) {
    //     const firstMessage = rst.error.issues?.[0]?.message;
    //     return res.status(400).json({ error: firstMessage });
    // }


    // const data = req.body;

    // if (!clientId) {
    //     console.log(clientId);

    //     return res.status(400).json({ error: "Invalid DATA" })
    // }

    // const result = await create(clientId, data);

    // if (!result) {
    //     return res.status(401).json({ error: "Invalid DATA" })
    // }

    return res.status(201).json({ success: "Beneficiaries created successful" });

}


module.exports = { createBeneficiaries };