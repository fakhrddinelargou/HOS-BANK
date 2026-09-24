const {z} = require("zod");

const complaintSchema = z.object({
    subject: z.string().trim().min(1, "The subject in necessary"),
    description: z.string().trim().min(1, "The description is nessessary"), 
    priority: z.enum(["low","normal","high"])
})

module.exports = {
    complaintSchema
};