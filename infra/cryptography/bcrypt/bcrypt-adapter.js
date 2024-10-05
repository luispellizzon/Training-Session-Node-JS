const bcrypt = require("bcrypt")

class BcryptAdapter{
  async hash (value){
    const hashedValue = await bcrypt.hash(value, Number(process.env.SALT))
    return hashedValue
  }

  async compare (password, hashedPassword){
    const isValid = await bcrypt.compare(password, hashedPassword)
    return isValid
  }
}

module.exports = BcryptAdapter