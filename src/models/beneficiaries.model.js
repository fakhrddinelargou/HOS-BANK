const { reconstructFieldPath } = require('express-validator/lib/field-selection');
const pool = require('../config/db')


async function getBeneficiairesByClientId(clientId){}
async function getBeneficiaireById(id){

    const data = await pool.query('SELECT * FROM beneficiaries WHERE id = $1 ' , [id]);
    return  data.rows[0]

}

async function create(clientId, data){
    const result = await pool.query('INSERT INTO beneficiaries (client_id,name,iban,bank_name , is_favorite) VALUES ($1,$2,$3,$4,$5) RETURNING id' , [clientId , data.name , data.iban , data.bank_name , data.isFavorite ?? false]);
    return result.rows[0];
}
async function update(id, newData){
    
    const fields = {};
    const  data  = await getBeneficiaireById(id)

    if( data.name !== newData.name){ fields.name = newData.name }
    if( data.iban !== newData.iban){ fields.iban = newData.iban }
    if( data.bank_name !== newData.bank_name){ fields.bank_name = newData.bank_name }

    
    if(Object.keys(fields).length === 0){ return 'nothing changed !'}

    const rows = Object.keys(fields).map((key , index) => ` ${key} =  $${index+1}`)
    const values = Object.values(fields)
    
    console.log(values);
    
    
    const result = pool.query(`UPDATE beneficiaries SET ${rows} WHERE id = $4 RETURNING *` , [...values , id])

    return result
    
    // const result = await pool.query('UPDATE beneficiaries SET name = $1 , iban = $2 , bank_name = $3 , is_favorite = $4 WHERE id = $5' , [data.name]);
    // return result.rows[0];
}
async function deleteBeneficiaire(id){}

module.exports = {create , getBeneficiaireById , update}