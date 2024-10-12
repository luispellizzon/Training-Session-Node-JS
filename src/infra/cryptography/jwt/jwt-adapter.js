const jwt = require('jsonwebtoken');

class JwtAdapter {
  #secret;
  constructor(secret) {
    this.#secret = secret;
  }

  encrypt(details) {
    const accessToken = jwt.sign(details, this.#secret);
    return accessToken;
  }

  decrypt(token) {
    const payload = jwt.verify(token, this.#secret);
    return payload;
  }
}

module.exports = JwtAdapter;
