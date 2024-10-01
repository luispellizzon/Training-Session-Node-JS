const parser = require("../middlewares/parser")
const cors = require("../middlewares/cors")
module.exports = (app) => {
    app.set(parser) 
    app.set(cors) 
}
