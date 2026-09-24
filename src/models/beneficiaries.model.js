const pool = require('../config/db')


async function getBeneficiairesByClientId(clientId){}
async function getBeneficiaireById(id){}

async function create(clientId, data){
    const result = await pool.query('INSERT INTO beneficiaries (client_id,name,iban,bank_name , is_favorite) VALUES ($1,$2,$3,$4,$5) RETURNING id' , [clientId , data.name , data.iban , data.bank_name , data.isFavorite ?? false]);
    return result.rows[0];
}
// async function update(id, data){
//     const result = await pool.query('UPDATE beneficiaries SET ' , [clientId , data.name , data.iban , data.bank_name , data.isFavorite ?? false]);
//     return result.rows[0];
// }
async function deleteBeneficiaire(id){}

module.exports = {create}