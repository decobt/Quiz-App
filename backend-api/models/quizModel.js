//include requred modules
var mongoose = require('mongoose');

//define the schema for the Product Model
var Schema = mongoose.Schema;
var quizSchema = new Schema({
    question: String,
    options: Array,
    answer: String
});

//define the productModel based on the schema
var quizModel = mongoose.model('quizModel', quizSchema);

var functions = {
  findQuiz: function(args,callbackFunc, res){
    //query for data by passing args
    quizModel.find(args, function (err, data) {
      //if error throw err
      if (err) throw err;
      //return the data with callback function
      //console.log(data);
      callbackFunc(data, res);
      return;
    });
  },
  addQuiz: function(args, callbackFunc, res){
    //init quiz obj with the data
    var newQuiz = new quizModel(args);
    //save the data
    newQuiz.save(function (err, data) {
      //if error throw err
      if (err) throw err;
      //callback function with data
      callbackFunc({
        id:data._id,
        question:data.question,
        options: data.options,
       answer:data.answer}, res);
      return;
    });
  },
  findRandom: function(args, callbackFunct, res){
    // Get the count of all users
    quizModel.count().exec(function (err, count) {
      //define array for the data
      var data = [];
      //to check if async fetch finished
      var completed = 0;

      //loop in order to get 10 records
      for(var i=0; i<10;i++){
      // Get a random entry
      var random = Math.floor(Math.random() * count);
      // Again query all users but only fetch one offset by our random #
      quizModel.findOne().skip(random).exec(
        function (err, result) {
          // Tada! random user
          data.push(result);
          //increment completed, because one fetch finished
          completed++;
          //check if 10 completed
          if(completed===10){
            //if yes, call callback function with the data
            callbackFunct(data,res);
          }
        });
      }
    });
  },
  updateQuiz: function(args){
    return "findOneQuiz Feedback";
  },
  deleteQuiz: function(args){
    return "findOneQuiz Feedback";
  },
  deleteQuestion: function(args){
    return "findOneQuiz Feedback";
  }
}

module.exports = functions;
