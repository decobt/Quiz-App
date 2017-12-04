//include requred modules
var mongoose = require('mongoose');

//define the schema for the Product Model
var Schema = mongoose.Schema;
var quizSchema = new Schema({
    id: Number,
    author: String,
    name: String
});

//define the productModel based on the schema
var quizModel = mongoose.model('quizModel', quizSchema);

var functions = {
  findQuiz: function(args){
    return "findAllQuiz Feedback";
  },
  addQuiz: function(args){
    var newQuiz = new quizModel(args);
    newQuiz.save(function(err) {
        if (err) throw err;
        console.log('Record have been saved');
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
