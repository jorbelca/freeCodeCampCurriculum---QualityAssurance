import bcrypt from 'bcrypt'
const saltRounds = 10;

async function checkUser(IP, hash) {
  if (IP && hash) {
    try {
      const result = bcrypt.compare(IP, hash)
      if (result) return result
    } catch (error) {
      return error
    }
  }
  try {
    const encryptedIP = bcrypt.hash(IP, saltRounds)
    if (encryptedIP) return encryptedIP
  } catch (error) {
    return error
  }
}
export default checkUser