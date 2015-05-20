var express = require('express');
var router = express.Router();
var path = require('path');
var Characters = require('../models/character');
var Users = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
    if (req.isAuthenticated()) {
        res.sendFile(path.resolve(__dirname, '../public/views/user.html'));
    } else {
        res.json("You are not Authenticated");
    }
});

////////////////////////////
// GET Users Characters
/////////////////////////
//router.get('/getStats', function(req, res, next) {
//    console.log("Getting stats");
//    return Characters.find({}, function(err, data){
//        console.log(data);
//        res.send(data);
//    });
//});
router.get('/getStats', function(req, res, next) {
    console.log("Getting stats");
    Users.findById(req.user._id, "characters", function(err, data){
        console.log(data);
        res.send(data);
    });
});

//////////////////////////
// ADD Character to User
/////////////////////////
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
    console.log("ID: ",req.user._id);
    Users.findById(req.user._id,
        function(err, user){
            if (err) {
                console.log("Find user failed:", err);
                next(err)
            }
            try {
                console.log("This User: ",user);

                user.characters.push(character);
                user.save(function (err) {
                    if (err) return next(err);
                    console.log('Success!');
                });
                console.log("Character added", character);
                res.send(character);
            }catch(exception){
                console.log("Push failed:", exception);
                next(err);
            }
        });
});

//router.delete('/:id', function(req, res, next) {
//    Users.findByIdAndRemove(req.params.id, req.body, function (err, Player) {
//        if (err) return next(err);
//        res.json(Player);
//    });
//});
//
//router.put('/:id', function(req, res, next) {
//    Users.findByIdAndUpdate(req.params.id, req.body, function (err, assignment) {
//        if (err) return next(err);
//        res.json(assignment);
//    });
//});


module.exports = router;
