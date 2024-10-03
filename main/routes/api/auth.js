const loginController = require("../../../presentation/controllers/auth/login-controller")
const expressRouterAdapter = require("../../adapters/express-router-adapter")
module.exports = (router) => {
    // router.post('/login', (req, res) => {
    //     const userData = {
    //         name: "Luis Pellizzon",
    //         token: "123123"
    //     }
    //     if (req.body.email !== "luis@email.ie") {
    //         const error = {
    //             message:"Invalid Credentials"
    //         }
            
    //         res.status(200).json(error)
    //     } 
    //     res.status(200).json(userData)
    //   });
    
    router.post("/login", expressRouterAdapter(loginController))
}