var express = require('express'),
    fs = require('fs'),
    models = require('./models'),
    Contribution = models.Contribution;

var app = express();

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.get('/contribution/:slug/:year/:location', function(req, res, next){
  var searchTerms = {
    slug: req.params.slug,
    year: req.params.year
  };

  if (!Number(req.params.location) && req.params.location.search('-') != -1) {
    searchTerms.muni = req.params.location;
  } else if (Number(req.params.location)) {
    searchTerms.ward = req.params.location;
  } else {
    searchTerms.state = req.params.location;
  }

  Contribution.find(searchTerms, function(err, docs) {
    res.send(docs);
  });
});

var loaded = 0;

app.get('/loaddata/:key', function(req, res, next) {
  if (req.params.key === process.env.LOAD_KEY && loaded === 0) {
    loadData();
    res.send('Data loaded successfully!');
    loaded = 1;
  } else if (req.params.key === process.env.LOAD_KEY && loaded === 1){
    res.send('Data has already been loaded.');
  } else {
    res.send('Incorrect load key.');
  }
});

function loadData() {
  if (!loaded) {
    var contributions = require('./data/contributions.json');

    Contribution.collection.insert(contributions, {}, function(err){
      console.log(err);
    });
  }
}

var port = process.env.PORT || 3000;
app.listen(port);

console.log('Express started on port ' + port);