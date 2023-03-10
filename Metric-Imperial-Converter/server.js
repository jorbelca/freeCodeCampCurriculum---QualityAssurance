'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const expect = require('chai').expect;
const cors = require('cors');
require('dotenv').config();

const apiRoutes = require('./routes/api.js');
const fccTestingRoutes = require('./routes/fcctesting.js');
const runner = require('./test-runner');
const ConvertHandler = require('./controllers/convertHandler.js');

let app = express();



app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({ origin: '*' })); //For FCC testing purposes only

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
app.route('/api/convert').get(function(req, res) {
  const { input } = req.query

  let initNum = ConvertHandler.getNum(input)
  let initUnit = ConvertHandler.getUnit(input)
  let returnUnit = ConvertHandler.getReturnUnit(initUnit)
  if (initNum.Error && returnUnit.Error) {
    return res.json('invalid number and unit')
  }

  if (initNum.Error) {
    return res.json('invalid number')
  }

  if (returnUnit.Error) {
    return res.json('invalid unit')
  } else {
    let returnNum = ConvertHandler.convert(initNum, initUnit)
    let string = ConvertHandler.getString(initNum, initUnit, returnNum, returnUnit)
    let result = {
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: string
    }
    res.send(result)
  }
});


//404 Not Found Middleware
app.use(function (req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

const port = process.env.PORT || 3000;

//Start our server and tests!
app.listen(port, function () {
  console.log("Listening on port " + port);
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        runner.run();
      } catch (e) {
        console.log('Tests are not valid:');
        console.error(e);
      }
    }, 1500);
  }
});

module.exports = app; //for testing
