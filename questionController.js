var Qs = require('./questionModel.js');
var Q = require('q');

var findQ = Q.nbind(Qs.findOne, Qs);
var findAll = Q.nbind(Qs.find, Qs);
var createQ = Q.nbind(Qs.create, Qs);

module.exports = {

  all : function(req, res, next) {
    findAll({}).then(function (qs) {
      //console.log("Find all Qs", qs);
      res.json(qs);
    })
    .fail(function (error) {
      next(error);
    });

  },

  newQ : function(req, res, next) {
    console.log('Add new question - server', req.body.text);
    var newQ = {
      text: req.body.text,
      ups: 0,
      downs: 0
    };

    createQ(newQ).then(function (newq) {
      console.log("New question created", newq);
      res.json(newq);
    })
    .fail(function (error) {
      next(error);
    });
  },

  thumbUp: function(req, res, next) {
    findQ({text:req.body.text}).then(function (qs) {
    console.log("Thumb Up - server", qs);
     qs.ups++;
     qs.save(function (err, savedQ) {
      if (err) {
        next(err);
      }
     });
   });
  },

  thumbDown: function(req, res, next) {
    findQ({text:req.body.text}).then(function (qs) {
    console.log("Thumb Down - server", qs);
     qs.downs++;
     qs.save(function (err, savedQ) {
      if (err) {
      //   next(err);
      }
     });
   });
  },






};