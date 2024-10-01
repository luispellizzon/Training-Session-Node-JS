module.exports = (router) => {
    router.get('/bookings', (req, res) => {
        const bookings = [{
            id: 1,
            customerName: "Luis",
            time:new Date()
        },
        {
            id: 2,
            customerName: "Tayna",
            time:new Date()
        },
        {
            id: 1,
            customerName: "Felipe",
            time:new Date()
        },
           
        ]
      res.render('bookings', {bookings});
    }); 
  }
  
  
  