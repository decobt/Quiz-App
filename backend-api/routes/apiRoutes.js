//include all required modules
var express = require('express');
var apiRoutes = express.Router();

//get models
var quizModel = require('../models/quizModel');

apiRoutes.route('/quiz')
  .get(function (req, res) {
    res.json({'description':quizModel.findAllQuiz()});
  })
  .post(function (req, res) {
    //get the post data
    console.log(req.body);
    res.json({id:0, name: req.body.name, description: req.body.description});
  })
  .put(function (req, res) {
    res.json({'description':quizModel.findAllQuiz()});
  })
  .delete(function (req, res) {
    res.json({'description':quizModel.findAllQuiz()});
  });

apiRoutes.route('/:quiz/question')
    .get(function (req, res) {
      res.json({'description':quizModel.findAllQuiz()});
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
