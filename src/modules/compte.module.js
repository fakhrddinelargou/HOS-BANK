const pool = require('../config/db');

const generateAccountNumber = () => {
    const acc = "ACC";
    const randomNumer = Math.floor(100000000 + Math.random() * 900000000);
    return `${acc}-${randomNumer}`;
};

async function getComptesByClientID(clientID) {
        const account = await pool.query('SELECT * FROM accounts WHERE client_id = $1 ' , [clientID])
        return account.rows[0]
}

function getCompteById(id){
    const compte = accounts.filter((el) => el.id === id);
    return compte
}

function getSoldeByCompteId(id){
    const AccountSolde = accounts.filter(el => el.id === id);

    return AccountSolde
}

// function updateSolde(id, montant) {

// }

async function createCompte(client_id){

    const account_number = generateAccountNumber(); 
    const type = 'checking';
    const balance = 0 ;
    const createAccount = await pool.query(`INSERT INTO accounts (client_id, account_number, type, balance) 
   VALUES ($1, $2, $3, $4) 
   RETURNING *`,
  [client_id, account_number, type, balance])

  return createAccount;
}

module.exports = {getComptesByClientID , getCompteById , getSoldeByCompteId , createCompte}