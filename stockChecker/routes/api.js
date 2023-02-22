'use strict';
import fetchAPI from "../services/apiService.js";

export default function (app) {

  app.route('/api/stock-prices')
    .get(async function (req, res) {
      const { stock, like } = req.query
      const { latestPrice } = await fetchAPI(stock)
      console.log(stock, like, latestPrice);
    })

    .post(function (req, res) {

      console.log(req.body, req.params);

    })


};
