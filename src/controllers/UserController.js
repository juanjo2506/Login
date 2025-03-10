const { rewriteURIForGET } = require("@apollo/client");
const UserModel = require("../../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const HandleUsers = require("../Models/User-function")
const {registerSchema} = require("../validations/RegisterValidation") 


UserController = {
    CreateUser: async (req, res) => {
        const { name, lastName, username, email, password, cc, country } = req.body;
        console.log(req.body);
        
        try {
            const validatedData = registerSchema.parse(req.body);
            const user = await HandleUsers.createUser(validatedData);

            res.status(201).json({
                id: user._id,
                name: user.name,
                lastName: user.lastName,
                country: user.country,
                username: user.username,
                email: user.email,
                cc: user.cc
            });
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    },

    loginUser: async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await HandleUsers.loginUser({ username, password }
            );
            const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "1h" });

            res.cookie("access_token", token, { 
                httpOnly: true, 
                secure: process.env.NODE_ENV === "production",
                samesite: "strict",
                maxAge: 3600000 
            }
                );

            /* res.status(200).json({
                message: "Inicio de sesión exitoso",
                id: user._id,
                username: user.username,
                email: user.email
                
            }); */
        } catch (error) {
            console.error(error);
            res.status(400).json({ message: error.message });
        }
    }

}
module.exports = UserController;