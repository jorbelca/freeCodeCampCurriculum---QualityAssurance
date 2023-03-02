'use strict';
import * as dotenv from 'dotenv'
dotenv.config()
import express from 'express';
import pkg from 'body-parser';
const { json, urlencoded } = pkg;

import cors from 'cors';

import apiRoutes from './routes/api.js';
import fccTestingRoutes from './routes/fcctesting.js';
import emiter from './test-runner.js';
import connectDB from './dbConnection.js';

const app = express();


app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy',
    "default-src 'self'; font-src 'self'; img-src 'self'; script-src 'self'; style-src 'self'; frame-src 'self'"
  );
  next();
});

app.use('/public', express.static(process.cwd() + '/public'));

app.use(cors({ origin: '*' })); //For FCC testing purposes only

app.use(json());
app.use(urlencoded({ extended: true }));

//Index page (static HTML)
app.route('/')
  .get(function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

//For FCC testing purposes
fccTestingRoutes(app);

//Routing for API 
apiRoutes(app);

//404 Not Found Middleware
app.use(function (req, res, next) {
  res.status(404)
    .type('text')
    .send('Not Found');
});

async function DB() {
  try {
    connectDB()
    console.log('Connected successfully to the DB');
  }
  catch { (console.error) }
  finally { () => client.close() }
}


//Start our server and tests!
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  DB()
  if (process.env.NODE_ENV === 'test') {
    console.log('Running Tests...');
    setTimeout(function () {
      try {
        emiter.run();
      } catch (e) {
        console.log('Tests are not valid:');
        console.error(e);
      }
    }, 3500);
  }
});

export default app; //for testing
