//include all required modules
var express = require('express');
var apiRoutes = express.Router();

//get models
var quizModel = require('../models/quizModel');

//helper callback function
var returnResponse = function(data, res){
  //send back json response
  res.json(data);
}

apiRoutes.route('/quiz')
  .get(function (req, res) {
    quizModel.findQuiz({}, returnResponse, res);
  })
  .post(function (req, res) {
    //call model function to add data to db, pass callback function
    quizModel.addQuiz(req.body, returnResponse, res);
  })
  .put(function (req, res) {
    res.json({'description':quizModel.findAllQuiz()});
  })
  .delete(function (req, res) {
    res.json({'description':quizModel.findAllQuiz()});
  });

apiRoutes.route('/quiz/random')
  .get(function (req, res) {
    quizModel.findRandom({}, returnResponse, res);
  });

apiRoutes.route('/:quiz/question')
    .get(function (req, res) {
      res.json({'description':quizModel.findRandom()});
    })
    .post(function (req, res) {
      res.json({'description':quizModel.findAllQuiz()});
    })
    .put(function (req, res) {
      res.json({'description':quizModel.findAllQuiz()});
    })
    .delete(function (req, res) {
      res.json({'description':quizModel.findAllQuiz()});
    });

module.exports = apiRoutes;
