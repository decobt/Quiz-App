//include requred modules
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

//define the schema for the Product Model
var Schema = mongoose.Schema;

var personalSchema = new Schema({
    username: String,
    password: String,
    personal: Schema.Types.Mixed,
    education: Array,
    work: Array,
    skill: Schema.Types.Mixed,
});

//define the productModel based on the schema
var personalModel = mongoose.model('personalModel', personalSchema);

var functions = {
  createUser: function (args, callbackFunc, res){
      var obj = new personalModel();
      obj.username = args.username;
      obj.password =  bcrypt.hashSync(args.password, 10);
      obj.save();
  },
  findUser: function (args, callbackFunc, res){
    //query for data by passing args
    personalModel.findOne({username: args.username}, function (err, data) {
      //if error throw err
      if (err) throw err;
      //return the data with callback function
      var personal = {}, skills = {};
      if(data.personal != 'undefined'){
        personal = data.personal;
      }
      if(data.skill != 'undefined'){
        skills = data.skill;
      }
      var d = {
        id: data._id,
        username: data.username,
        personal: personal,
        work: data.work,
        education: data.education,
        skill: skills
      }
      callbackFunc(d, res);
      return;
    });
  },
  updateUser: function(args,callbackFunc, res){

    var obj = new personalModel();

    obj.personal = args.personal;
    obj.education = args.education;
    obj.work = args.work;
    obj.skill = args.skills;
    obj.save();
    console.log(args);
    res.json({data:true});
  }
}

module.exports = functions;
