'use strict';
import checkUser from "../bcrypt/bcrypt.js";
import Stock from "../models/Stock.js";
import fetchAPI from "../services/apiService.js";

export default function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res) {
      let IP = await checkUser(req.headers['x-forwarded-for'] || req.socket.remoteAddress)
      let { stock, like } = req.query
      if (typeof stock == 'string') stock = [stock]
      let response = []
      stock.map(async (singleStock) => {
        let likes
        const { latestPrice: LP, symbol: SY } = await fetchAPI(singleStock)

        const DB = await Stock.findOne({ symbol: SY })


        if (like === 'true' && !DB) {
          const newDbRegister = await Stock.create({ symbol: SY, likes: [IP] })
          if (newDbRegister) likes = newDbRegister.likes.length

        } else if (like === 'true' && DB) {
          likes = DB.likes.length
          let IPinDb = false


          for await (let n of DB.likes) {
            let res = await checkUser(req.headers['x-forwarded-for'] || req.socket.remoteAddress, n)

            if (res) {
              IPinDb = true
            }
          }


          if (!IPinDb) {
            DB.likes.push(IP)
            await DB.save()
            likes++
          }

        } else {
          if (DB) likes = DB.likes.length
          if (!DB) likes = 0
        }


        if (!SY && !LP) {
          return res.status(200).json({
            stockData: {
              error: "external source error"
            }
          })
        }

        if (stock.length === 1) {
          return res.status(200).json({
            stockData: {
              stock: SY,
              price: LP,
              likes: likes
            }
          })
        }

        response.push({
          stock: SY,
          price: LP,
          rel_likes: likes
        })

        if (response.length === 2) {
          const difference = likes = response[0].rel_likes - response[1].rel_likes
          response[0].rel_likes = difference
          response[1].rel_likes = -difference
        }
        if (response.length === stock.length) return res.status(200).json({ stockData: response })
      })


    })
};
