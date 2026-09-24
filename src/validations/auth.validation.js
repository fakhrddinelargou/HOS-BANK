const { z } = require("zod");

const registerSchema = z.object({
    first_name: z.string().trim().min(2).max(50).regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, "Le prénom contient des caractères invalides"),
    last_name: z.string().trim().min(2).max(50).regex(/^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]+$/, "Le nom contient des caractères invalides"),
    email: z.string().trim().email(),
    password: z.string().min(8),
    phone: z.string().trim().min(10).max(15)
});

const loginSchema = z.object({
    email: z.string().trim().email(),
    password: z.string().min(8)
})

module.exports = {
    registerSchema,
    loginSchema
};