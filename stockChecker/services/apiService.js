import * as dotenv from 'dotenv' 
dotenv.config()
import { default as fetch } from 'node-fetch';



let url = process.env.API_SERVICE;


// /v1/stock/[symbol]/quote


const fetchAPI = async (symbol) => {
  try {
    const response = await fetch(`${url}/v1/stock/${symbol}/quote`)
    return response.json()
  } catch (error) {
    return error
  }

}


export default fetchAPI