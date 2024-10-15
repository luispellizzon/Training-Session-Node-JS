class IdGenerator {
  generate() {
    const IdLength = 10;
    let randomId = 'R00';
    for (let i = 0; i < IdLength - 3; i++) {
      const randomNumber = Math.floor(Math.random() * IdLength);
      randomId += randomNumber.toString();
    }
    return randomId;
  }
}

module.exports = IdGenerator;
