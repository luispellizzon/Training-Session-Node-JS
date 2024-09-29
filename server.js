const MongoHelper = require('./infra/helpers/MongoHelper');
const app = require('./main/config/app');

MongoHelper.connect(process.env.MONGO_URL)
  .then(async () => {
    app.listen(process.env.PORT, () =>
      console.log(`Running at localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.error('Failed to connect to the database', err);
  });
