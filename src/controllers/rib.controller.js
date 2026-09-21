const { generateIban, generateBic } = require('../utils/generatebankinfo');
const { getCompteById } = require('../models/compte.module');
const { createRib , getRibByCompteId } = require('../models/rib.module');
const { json } = require('express');

async function createRIB(req, res) {
    const accountID = Number(req.body.accountId);

    if (!accountID) {
        return res.status(400).json({ error: 'Invalid DATA' });
    }

    const account = await getCompteById(accountID);
    if (!account) {
        return res.status(404).json({ error: 'Account not found' });   // 404 machi 400 هنا، الID صحيح لكن compte ماكايناش
    }

    const existingRib = await getRibByCompteId(accountID);
    if (existingRib) {
        return res.status(409).json({ error: 'RIB already exists for this account', rib: existingRib });
    }

    const iban = generateIban(account.account_number);
    const bic = generateBic();

    const result = await createRib(accountID, iban, bic);
    if (!result) {
        return res.status(500).json({ error: 'RIB creation failed' });
    }

    return res.status(201).json({ message: 'RIB created successfully', rib: result });
}

async function getRibByCompteID(req , res) {

    const accountId = Number(req.params.id);
    
    if(!accountId){
        return res.status(400).json({ error: 'Invalid ID' });
    }

    const rib = await getRibByCompteId(accountId);

    if(!rib){
        return res.status(404).json({ error: 'RIB not found' });
    }


    return res.json({RIB : rib});

}

module.exports = { createRIB , getRibByCompteID }