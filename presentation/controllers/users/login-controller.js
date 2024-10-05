// const loginValidator = require("../../validators/login-validator")
// const {badRequest, serverError, success} = require("../../helpers/http-helper")

// const loginController = async (request) => {
//     try {
//         const body = request.body
//         const error = loginValidator(body)
    
//         if (error) {
//             return badRequest(error)
//         }

//         return success({
//             name: "Luis",
//             message:"Success"
//         })
//     } catch (error) {
//         return serverError(error)
//     }

// }

// module.exports = loginController