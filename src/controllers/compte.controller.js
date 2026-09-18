const {getComptesByClientID , createCompte , getCompteById  ,  getSoldeByCompteId ,  updateSolde} = require('../modules/compte.module');

// DONE
async function getComptesByCID(req, res) {

    const id = Number(req.params.id)

    if (!Number(id)) {
        return res.status(400).json({ error: 'ID invalide' })
    }

    const compte = await getComptesByClientID(id);

    

    if (compte) {
        return res.json({ data: compte })
    } else {
        return res.status(404).json({ error: 'Account not found' })
    }
}

// DONE
async function getCompteByID(req, res) {

    const id = Number(req.params.id);

    if (!Number(id)) {
        return res.status(400).json({ error: "Id Invalid" });
    }

    const compte =  getCompteById(id);
  
    
    if (compte) {
        return res.json({ data: compte })
    } else {
        return res.status(404).json({ error: "Account not found" });
    }


}

// DONE
async function getSolde(req, res) {
    const id = Number(req.params.id);
    if (!Number(id)) {
        res.status(400).json({ error: "Invalid ID" })
    }

    const soldeA = await getSoldeByCompteId(id);

    if (soldeA) {
        return res.json({ solde: soldeA })
    } else {
        return res.status(404).json({ error: "Account not found" })
    }
}

async function updateSoldeAccount(req , res){
    const id = Number(req.params.id)
    const montant = Number(req.body.montant)

    if(!Number(id) || !Number(montant)){
        return res.status(400).json({error : 'Invalid DATA'})
    }
 
    const result = await updateSolde(id ,montant);
    console.log(result);

    if(result === 1){
        return res.json({success : "Amount updated successful"})
    }else{
        return res.status(404).json({error : 'Account not found'})
    }
}

// DONE
async function createAccount(req, res) {
    const clientId = req.body.client_id;

    if (!Number(clientId)) {
        return res.status(400).json({ error: "Invalide CLIENT_ID" })
    }

    const  result  = await createCompte(clientId)

    if(result){
        res.json({ success: 'Account created successful' });
    }else{
        res.json({ Error: 'Something Worng' });
    }
    
}



module.exports = { getComptesByCID, getCompteByID, getSolde, createAccount , updateSoldeAccount }