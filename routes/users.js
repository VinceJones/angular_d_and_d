var express = require('express');
var router = express.Router();
var path = require('path');
var Player = require('../models/player');

/* GET users listing. */
router.get('/getStats', function(req, res, next) {
    console.log("Getting stats");
    return Player.find({}, null, function(err, data){
       res.send(data);
    });
});

router.post('/add', function(req, res, next){
    Player.create(req.body, function(err, data){
        if (err) next(err);
        console.log("Player added", data);
    });
});

module.exports = router;
