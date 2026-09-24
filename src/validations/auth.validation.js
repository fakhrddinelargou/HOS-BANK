const { z } = require("zod");

const registerSchema = z.object({
    first_name: z.string().min(2).max(50),
    last_name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8),
    phone: z.string().min(10).max(15)
});

module.exports = {
    registerSchema
};