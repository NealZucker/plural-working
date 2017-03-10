let express = require('express');
let router = express.Router();
let Gif = require('../../src/models/Gif');
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

router.use(function(req, res, next){
  console.log('something is happening');
  res.setHeader('Content-Type', 'application/json');
  next();
});

router.route('/gifRoutes')
  .post(function(req, res, next){

    let gif = new Gif();

    gif.name = req.body.name;
    gif.description = req.body.description;
    gif.url = req.body.url;
    gif.save(function(err, gif){
      if (err) {
        next(err);
      }
      else{
        res.json(gif);
      }
    });
  })

  .get(function(req, res, next){
    Gif.find(function(err, gif){
      if(err){
        return next(err);
      } else {
        res.json(gif);
      }
    });
  });

router.route('/gifRoutes/:gif_id')
  .delete(function(req, res){
    Gif.remove({_id: req.params.gif_id}, function(err, gif){
      if(err){
        console.log(err);
      } else {
        res.json({title: 'gif was successfully deleted!'});
      }
    });
  });


module.exports = router;
