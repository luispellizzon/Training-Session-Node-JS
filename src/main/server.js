const MongoHelper = require('../infra/db/mongodb/helpers/MongoHelper');

MongoHelper.connect(process.env.MONGO_URL)
  .then(async () => {
    const app = require('./config/app');
    app.listen(process.env.PORT, () =>
      console.log(`Running at localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.error('Failed to connect to the database', err);
  });
