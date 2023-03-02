const fetch = require('node-fetch');

require('dotenv').config()



let url = process.env.API_SERVICE;

const fetchAPI = async (symbol) => {
  try {
    const response = await fetch(`${url}/v1/stock/${symbol}/quote`)
    return response.json()
  } catch (error) {
    return error
  }

}


module.exports = fetchAPI