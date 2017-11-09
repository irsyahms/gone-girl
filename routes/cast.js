const express = require('express');
const router = express.Router();
const Model = require('../models');
const helper = require('../helper/helper');

router.get('/', function(req,res) {
  Model.Cast
   .findAll()
   .then(casts => {
     res.render('cast', {dataCasts: casts})
   })
   .catch(err => {
     res.send(err)
   })
});

router.get('/add', function(req,res) {
  res.render('add-edit-cast', {action: 'save'});
});

router.post('/add', function(req,res) {
  Model.Cast
   .create({
     first_name: req.body.first_name,
     last_name: req.body.last_name,
     birth_year: req.body.birth_year,
     gender: req.body.gender
   })
   .then(cast => {
     res.redirect('/casts');
   })
   .catch(err => {
     console.log(err);
     res.send(err)
   })
});

router.get('/edit/:id', function(req,res) {
  Model.Cast
   .findById(req.params.id)
   .then(cast => {
     res.render('add-edit-cast', {cast: cast, action: 'update'});
   })
   .catch(err => {
     console.log(err);
     res.send(err)
   })
});

router.post('/edit/:id', function(req,res) {
  Model.Cast
   .update({
     first_name: req.body.first_name,
     last_name: req.body.last_name,
     birth_year: req.body.birth_year,
     gender: req.body.gender
   }, {
     where: {
       id: req.params.id
     }
   })
   .then(cast => {
     res.redirect('/casts');
   })
   .catch(err => {
     console.log(err);
     res.send(err)
   })
});

router.get('/delete/:id', function(req,res) {
  Model.Cast
   .destroy({
     where: {
       id: req.params.id
     }
   })
   .then(cast => {
     res.redirect('/casts')
   })
   .catch(err => {
     console.log(err);
     res.send(err)
   })
});


router.get('/:id/listMovies', function(req,res) {
  Model.Cast
  .findById(req.params.id, {
    include: {
      model: Model.Movie
    }
  })
  .then(casts => {
    //manipulasi object
    casts.Movies.map(movie => {
      movie.age = helper.convertAge(casts.birth_year, movie.released_year);
    })
    res.render('list-movie', {cast: casts})
    //res.send(casts);
  })
  .catch(err => {
    console.log(err);
    res.send(err);
  })
});

module.exports = router;
