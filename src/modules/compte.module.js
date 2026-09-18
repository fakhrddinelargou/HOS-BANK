const pool = require('../config/db');


// GENERATE ACCOUNT NUMBER
const generateAccountNumber = () => {
    const acc = "ACC";
    const randomNumer = Math.floor(100000000 + Math.random() * 900000000);
    return `${acc}-${randomNumer}`;
};


//  DONE
async function getComptesByClientID(clientID) {
        const account = await pool.query('SELECT * FROM accounts WHERE client_id = $1 ' , [clientID])
        return account.rows[0];
}

// DONE
async function getCompteById(id){
    const compte = await pool.query('SELECT * FROM  accounts WHERE id = $1' , [id]);
    return compte.rows[0]
}

// DONE
async function getSoldeByCompteId(id){
    
    const AccountSolde = await pool.query('SELECT balance FROM accounts WHERE id = $1' , [id]);

    return AccountSolde.rows[0];
}

// DONE
async function updateSolde(id, montant) {
    
    const solde = await pool.query('UPDATE accounts  SET balance = balance + $1 WHERE id = $2' , [montant , id]);
    return solde.rowCount;

}


// DONE
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

module.exports = {getComptesByClientID , getCompteById , getSoldeByCompteId , createCompte , updateSolde }