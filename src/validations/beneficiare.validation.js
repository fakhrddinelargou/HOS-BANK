const z = require('zod');


const createBeneficiariesSchema = z.object({
    name: z.string().min(3).max(225).regex(/^[a-zA-Z\s]+$/, { message: "Name must contain only letters" }),
    iban: z.string().min(28).max(28),
    bank_name: z.string().min(3).max(225),
    isFavorite : z.boolean()
})



module.exports = {createBeneficiariesSchema}