const compteModules = require('../modules/compte.module');

function getComptesByCID(req, res) {

    const id = Number(req.params.id)

    if (!Number(id)) {
        return res.status(400).json({ error: 'ID invalide' })
    }

    const compte = compteModules.getComptesByClientID(id);

    if (compte && compte.length > 0) {
        return res.json({ success: compte })
    } else {
        return res.status(404).json({ error: 'Account not found' })
    }
}

function getCompteByID(req, res) {
    const id = Number(req.params.id);

    if (!Number(id)) {
        return res.status(400).json({ error: "Id Invalid" });
    }

    const compte = compteModules.getCompteById(id);

    if (compte && compte.length > 0) {
        return res.json({ success: compte })
    } else {
        return res.status(404).json({ error: "Account not found" });
    }


}

function getSolde(req, res) {
    const id = Number(req.params.id);
    if (!Number(id)) {
        res.status(400).json({ error: "Invalid ID" })
    }

    const soldeA = compteModules.getSoldeByCompteId(id);

    if (soldeA && soldeA.length > 0) {
        return res.json({ solde: soldeA[0].solde })
    } else {
        return res.status(404).json({ error: "Account not found" })
    }
}

function updateSoldeAccount(req , res){
    const id = Number(req.params.id)
    const montant = Number(req.params.montant)


    if(!Number(id) && Number(montant)){
        return res.status(400).json({error : 'Invalid ID'})
    }

    const method = true// mothod

    if(method){
        return res.json({success : "Amount updated successful"})
    }else{
        return res.status(404).json({error : 'Account not found'})
    }


}


function createAccount(req, res) {
    const clientId = req.body.client_id;

    if (!Number(clientId)) {
        return res.status(400).json({ error: "Invalide CLIENT_ID" })
    }

    compteModules.createCompte(clientId)

    res.json({ success: 'Account created successful' });
}



module.exports = { getComptesByCID, getCompteByID, getSolde, createAccount }