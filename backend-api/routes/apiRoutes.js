//include all required modules
var express = require('express');
var apiRoutes = express.Router();

//get models
var quizModel = require('../models/quizModel');

apiRoutes.route('/getAll')
  .get(function (req, res) {
    res.end(quizModel.findAllQuiz());
  });

module.exports = apiRoutes;
