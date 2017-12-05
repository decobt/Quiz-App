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
  updateQuiz: function(args){
    return "findOneQuiz Feedback";
  },
  deleteQuiz: function(args){
    return "findOneQuiz Feedback";
  },
  addQuestion: function(args){
    return "findOneQuiz Feedback";
  },
  deleteQuestion: function(args){
    return "findOneQuiz Feedback";
  }
}

module.exports = functions;
