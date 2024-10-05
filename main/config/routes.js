const express = require("express")
const fs = require("fs")
const path = require("path")

module.exports = (app) => {
    const contentRouter = express.Router()
    const apiRouter = express.Router()
    app.use('/', contentRouter)
    app.use('/api', apiRouter)

    fs.readdirSync(path.join(__dirname, '../routes')).map(async (file) => {
        const route = require(`../routes/${file}`)
        route(apiRouter)
    })

    app.all("*", (_, res) => {
        res.status(404)
        res.render("error")
    })
}