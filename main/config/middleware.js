const parser = require("../middlewares/parser")
const cors = require("../middlewares/cors")
module.exports = (app) => {
    app.use(cors) 
    app.use(parser) 
}
