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

router.get('/input', function(req, res) {
    res.render('mapInput', { title: 'Input Map' });
});


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', function (err) {
    if (err) console.log('could not connect to mongodb ...');
    else console.log('Successfully connected to mongodb ... ');
});

var LocalModel = mongoose.model('Contact', {
    name: String,
    keyword: String,
    latLng: String
});

router.post('/contacts', function (req, res) {
    (new LocalModel(req.body)).save(function (err, result) {
        if (err) res.status(500).json({ message: 'Sorry! Something broke!' });
        else res.status(201).json(result)
    });
});
router.get('/contacts', function(req, res) {
    LocalModel.find(function (err, result) {
        if (err) res.status(500).json({ message: 'Sorry! Something broke!' });
        else res.status(201).json(result)
    });
});
router.put('/contacts/:id', function (req, res) {
    LocalModel.findByIdAndUpdate(req.params.id, req.body, function (err, result){
        if (err) res.status(500).json({ message: 'Sorry! Something broke!' });
        else res.status(200).json(result);
    });
});
router.delete('/contacts/:id', function (req, res) {
    LocalModel.findByIdAndRemove(req.params.id, function (err, result){
        if (err) res.status(500).json({ message: 'Sorry! Something broke!' });
        else res.status(200).json(result);
    });
});
module.exports = router;
