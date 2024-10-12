const cors = (req, res, next) => {
  const allowedOrigins = ['http://127.0.0.1:8080', 'http://localhost:8080'];
  const origin = req.headers.origin;

  if (process.env.NODE_ENV === 'development') {
    res.setHeader('Access-Control-Allow-Origin', origin || '');
  }

  if (process.env.NODE_ENV === 'production') {
    if (allowedOrigins.includes(origin)) {
      res.setHeader('Access-Control-Allow-Origin', origin);
    }
  }
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Access-Control-Allow-Headers, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
  next();
};

module.exports = cors;
