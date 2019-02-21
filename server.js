const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const routerRestaurants = require('./api/routes/restaurants');
const routerAreas = require('./api/routes/areas');

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended : true
}));

app.use(morgan("dev"));

app.use('/restaurants', routerRestaurants);
app.use('/areas', routerAreas);

app.listen(3002);