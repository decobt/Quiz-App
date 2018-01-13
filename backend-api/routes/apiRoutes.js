//include all required modules
var express = require('express');
var apiRoutes = express.Router();

//get models
var quizModel = require('../models/quizModel');
var userModel = require('../models/userModel');

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
  .delete(function (req, res) {
    //console.log(req.body.items)
    quizModel.deleteQuiz(req.body.items, returnResponse, res);
  });

  apiRoutes.route('/user')
    .get(function (req, res) {
      userModel.findQuiz({}, returnResponse, res);
    })
    .post(function (req, res) {
      //call model function to add data to db, pass callback function
      console.log(req.body);
      userModel.findUser(req.body, null, res);
    })
    .delete(function (req, res) {
      //console.log(req.body.items)
      quizModel.deleteQuiz(req.body.items, returnResponse, res);
    });

    apiRoutes.route('/login')
      .post(function (req, res) {
        //call model function to add data to db, pass callback function
        //console.log(req.body);
        userModel.findUser(req.body, returnResponse, res);
      });

    apiRoutes.route('/signup')
        .post(function (req, res) {
          //call model function to add data to db, pass callback function
          console.log(req.body);
          userModel.createUser(req.body, returnResponse, res);
      });

apiRoutes.route('/quiz/random')
  .get(function (req, res) {
    quizModel.findRandom({}, returnResponse, res);
  });

apiRoutes.route('/:quiz/question')
    .get(function (req, res) {
      res.json({'description':quizModel.findRandom()});
    });

module.exports = apiRoutes;
