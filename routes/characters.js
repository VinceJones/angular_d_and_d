var express = require('express');
var router = express.Router();
var path = require('path');
var Characters = require('../models/character');
var Users = require('../models/user');


/* GET users listing. */
router.get('/getStats', function(req, res, next) {
    console.log("Getting stats");
    return Characters.find({}, function(err, data){
        console.log(data);
       res.send(data);
    });
});

router.post('/add', function(req, res, next){
    console.log("Request Data ",req.body);
        var character =  new Characters({
            name: req.body.name,
            class: req.body.class,
            str: req.body.str,
            dex: req.body.dex,
            con: req.body.con,
            int: req.body.int,
            wis: req.body.wis,
            cha: req.body.cha
        });

    Users.findById('555c04cfe169248b1011ba5a',
        function(err, user){
        console.log(user);

        if (err) {
            console.log(err);
            next(err)
        }
            user.character.push(character);
            //player.save();
        console.log("Character added", character);
    });
});

router.delete('/:id', function(req, res, next) {
    Users.findByIdAndRemove(req.params.id, req.body, function (err, Player) {
            if (err) return next(err);
            res.json(Player);
        });
});

router.put('/:id', function(req, res, next) {
    Users.findByIdAndUpdate(req.params.id, req.body, function (err, assignment) {
        if (err) return next(err);
        res.json(assignment);
    });
});

module.exports = router;
