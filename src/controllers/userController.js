class UserController {
    async getUser(req, res) {
        res.send("Hello from the user controller");
    }
}


module.exports = new UserController();
