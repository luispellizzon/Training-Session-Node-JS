module.exports = (router) => {
    router.get('/data', (req, res) => {
        res.status(200).send(JSON.stringify({name:"Luis"}))
      });    
}
