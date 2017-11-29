const express = require('express');
const router = express.Router();
const Model = require('../models');

router.get('/', function(req,res) {
  Model.Movie
   .findAll({
     order: [['released_year', 'DESC']]
   })
   .then(movies => {
     res.render('movie', {dataMovies: movies})
   })
   .catch(err => {
     console.log(err);
   })
});

// router.get('/:id/addCast', function(req,res) {
//   let message = null;
//   if(req.query.hasOwnProperty('err')) {
//     message = 'Role must be filled';
//   }
//
//   Model.Movie
//    .findById(req.params.id)
//    .then(movie => {
//      Model.Cast
//       .findAll()
//       .then(casts => {
//         res.render('casting', {movie: movie, dataCasts: casts, err: message})
//       })
//    })
//    .catch(err => {
//      console.log(err);
//      res.send(err)
//    })
//
// });

// router.post('/:id/addCast', function(req,res) {
//   let role = null
//   if(req.body.role.trim() !== '') {
//     role = req.body.role
//   }
//
//   Model.MovieCast
//    .create({
//      MovieId: req.params.id,
//      CastId: req.body.CastId,
//      role: role
//    })
//    .then(mc => {
//      res.redirect(`/movies`);
//    })
//    .catch(err => {
//      if(err.message === 'notNull Violation: MovieCast.role cannot be null') {
//        res.redirect(`/movies/${req.params.id}/addCast?err=role`)
//      } else {
//        res.send(err)
//      }
//
//    })
//
// });

router.get('/:id/assignCast', function(req,res) {
  let message = null;
  if(req.query.hasOwnProperty('err')) {
    message = 'Role must be filled';
  }

  Model.Movie
   .findById(req.params.id, {
     include: {
       model: Model.Cast
     }
   })
   .then(movie => {
     Model.Cast
      .findAll()
      .then(casts => {
        res.render('full-casting', {movie: movie, dataCasts: casts, err: message})
      })
   })
   .catch(err => {
     console.log(err);
     res.send(err)
   })
});

router.post('/:id/assignCast', function(req,res) {
  let role = null
  if(req.body.role.trim() !== '') {
    role = req.body.role
  }

  Model.MovieCast
   .create({
     MovieId: req.params.id,
     CastId: req.body.CastId,
     role: role
   })
   .then(mc => {
     res.redirect(`/movies/${req.params.id}/assignCast`);
   })
   .catch(err => {
     if(err.message === 'notNull Violation: MovieCast.role cannot be null') {
       res.redirect(`/movies/${req.params.id}/assignCast?err=role`)
     } else {
       res.send(err)
     }

   })

});



module.exports = router;
