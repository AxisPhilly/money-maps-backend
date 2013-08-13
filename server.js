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

var port = process.env.PORT || 3000;
app.listen(port);

console.log('Express started on port ' + port);