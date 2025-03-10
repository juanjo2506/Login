const { z } = require("zod");

const registerSchema = z.object({
    name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
    lastName: z.string().min(2, "El apellido debe tener al menos 2 caracteres"),
    username: z.string().min(3, "El usuario debe tener al menos 3 caracteres"),
    email: z.string().email("El email no es válido"),
    country: z.string().min(3, "El país debe tener al menos 3 caracteres"),
    password: z.string()
        .min(8, "La contraseña debe tener al menos 8 caracteres")
        .regex(/[A-Z]/, "Debe contener al menos una letra mayúscula")
        .regex(/[a-z]/, "Debe contener al menos una letra minúscula")
        .regex(/\d/, "Debe contener al menos un número")
        .regex(/[@$!%*?&]/, "Debe contener al menos un carácter especial"),
    cc: z.string()
        .min(8, "La cédula debe tener al menos 8 dígitos")
        .max(10, "La cédula no puede tener más de 10 dígitos")
        .regex(/^\d+$/, "La cédula solo puede contener números")
});



module.exports = { registerSchema };