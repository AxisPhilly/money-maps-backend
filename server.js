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

  if (!Number(req.params.location) && req.params.location.length == 2) {
    searchTerms.state = req.params.location;
  } else if (Number(req.params.location)) {
    searchTerms.ward = req.params.location;
  } else {
    searchTerms.county = req.params.location;
  }

  Contribution.find(searchTerms, function(err, docs) {
    res.send(docs);
  });
});

app.get('loaddata/:key', function(req, res, next) {
  if (req.params.key === process.env.LOAD_KEY) {
    loadData();
    res.send('Data loaded successfully!');
  } else {
    res.send('Data has already been loaded.');
  }
});

var loaded = 0;

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