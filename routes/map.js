var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');


/* GET home page. */
router.get('/', function(req, res) {
    res.render('map', { title: 'Map Search' });
});


router.get('/test', function(req, res) {
    res.render('mapTest', { title: 'Test Map' });
});

router.get('/mark', function(req, res) {
    res.render('markMap', { title: 'Mark Map' });
});

router.get('/mapinput', function(req, res) {
    res.render('mapInput', { title: 'Input Map' });
});


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', function (err) {
    if (err) console.log('could not connect to mongodb ...');
    else console.log('Successfully connected to mongodb ... ');
});

var LocalModel = mongoose.model('Local', {
    name: String,
    keyword: String,
    departments: String,
    lat: String,
    lng: String,
    city: String,
    state: String,
    zip: String
});

LocalModel.find(function (err, result) {
    console.log(result);
});
router.get('/mapinput/:zip', function(req, res) {

    var zipcode = req.params.zip;

    LocalModel.find({ 'zip': zipcode},function (err, result) {
        if (err) { res.status(500).json({ message: 'Sorry! Something broke on GET!' });}
        else {
            res.status(200).json(result);
        }
    });
});

router.post('/mapinput', function (req, res) {
    (new LocalModel(req.body)).save(function (err, result) {
        if (err) res.status(500).json({ message: 'Sorry! Something broke on POST!' });
        else res.status(201).json(result)
    });
});

router.put('/mapinput/:id', function (req, res) {
    LocalModel.findByIdAndUpdate(req.params.id, req.body, function (err, result){
        if (err) res.status(500).json({ message: 'Sorry! Something broke on PUT!' });
        else res.status(200).json(result);
    });
});
router.delete('/mapinput/:id', function (req, res) {
    LocalModel.findByIdAndRemove(req.params.id, function (err, result){
        if (err) res.status(500).json({ message: 'Sorry! Something broke on DELETE!' });
        else res.status(200).json(result);
    });
});
module.exports = router;

/*
 * router.get('/mapinput/:keyword', function(req, res) {
 var keywd = req.params[0].keyword;

 LocalModel.find({ 'keyword.value': keywd},function (err, result) {
 if (err) { res.status(500).json({ message: 'Sorry! Something broke on GET!' });}
 else {
 res.status(201).json(result);
 }
 });
 });
 */