//include requred modules
var mongoose = require('mongoose');

//define the schema for the Product Model
var Schema = mongoose.Schema;
var quizSchema = new Schema({
    id: Number,
    author: String,
    name: String,
    date: {
        type: Date,
        default: Date.now
    }
});

//define the productModel based on the schema
var quizModel = mongoose.model('quizModel', quizSchema);

var functions = {
  findAllQuiz: function(){
    return "findAllQuiz Feedback";
  },
  findOneQuiz: function(){
    return "findOneQuiz Feedback";
  }
}

module.exports = functions;
