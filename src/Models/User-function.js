const UserModel = require("../../models/User");
const bcrypt = require("bcrypt");

const HandleUsers = {
    createUser: async ({ name, lastName, username, email, password, cc, country }) => {
        try {
            // Verificar si el email o username ya existen
            const emailExists = await UserModel.findOne({ email });
            if (emailExists) {
                throw new Error("El email ya está registrado");
            }

            const usernameExists = await UserModel.findOne({ username });
            if (usernameExists) {
                throw new Error("El usuario ya está registrado");
            }

            // Hash de la contraseña
            const hashedPassword = await bcrypt.hash(password, 10);

            // Crear el usuario
            const user = new UserModel({ name, lastName, username, email, password: hashedPassword, cc, country});
            await user.save();

            return user;
        } catch (error) {
            throw error;
        }
    },

    loginUser: async ({ username, password }) => {
        try {
            const user = await UserModel.findOne({ username });
            if (!user) {
                throw new Error("El usuario no existe");
            }

            // Comparar contraseña
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                throw new Error("Contraseña incorrecta");
            }

            return user; // Aquí podrías generar un token en lugar de devolver el usuario
        } catch (error) {
            throw error;
        }
    }
};

module.exports = HandleUsers;