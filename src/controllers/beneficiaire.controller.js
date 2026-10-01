const { name } = require('ejs');
const { getBeneficiairesByClientId, getBeneficiaireById, create, update, deleteBeneficiaire } = require('../models/beneficiaries.model');
const {createBeneficiariesSchema} = require('../validations/beneficiare.validation');
const { reconstructFieldPath } = require('express-validator/lib/field-selection');

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

async function getBeneficiaireByID(req,res) {
    
    const id = req.params.id;
    
    if(!Number(id)){
        return res.status(400).json({error :  "Invalid DATA"})
    }

    const reponse = await getBeneficiaireById(id);

    if(!reponse){
     return res.status(404).json({error : "Beneficiaire not found"})
    }

    return res.json({data : reponse})

}

async function up(req , res) {
    const data = {
        "name": "houssam",
        "iban": "MA6401100000000000000",
        "bank_name": "CIH Bank"
    }
  const result = await update(29  , data)
    return res.json({message : result} )
}

module.exports = { createBeneficiaries , getBeneficiaireByID , up };