'use strict'
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
const db = require("../models").db;
// const db = require('../models');
const Hotel = require("../models").Hotel;
const Restaurant = require("../models").Restaurant;
const Place = require("../models").Place;
const Activity = require("../models").Activity;

const app = express();


app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(morgan('dev'));
app.use(express.static('./public'));
// app.use(express.static(path.join(__dirname, '..', 'public')));


  app.get('/api', function(req, res, next) {
      Promise.all([Hotel.findAll(), Restaurant.findAll(), Activity.findAll()])
        .then(function (allAttractions) {
            res.json(allAttractions);
        })
  })



app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });


app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.error(err);
    res.send(
      err.message + "Sorry this is an error"
    );
  });


  app.listen(3000, function() {
    console.log("The server is listening closely on port", 3000);
    db
      .sync()
      .then(function() {
        console.log("Synchronated the database");
      })
      .catch(function(err) {
        console.error("Trouble right here in River City", err, err.stack);
      });
  });