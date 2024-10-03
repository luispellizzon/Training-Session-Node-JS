module.exports = (router) => {
  router.get('/', (req, res) => {
    res.render('index');
  }); 

  router.get('/login', (req, res) => {
    const error = {}
    res.render('login', {error});
  });

  
  router.get("/dashboard", (req, res) => {
    res.render("dashboard")
  })
  router.get('/register', (req, res) => {
    res.render('register');
  });
}


