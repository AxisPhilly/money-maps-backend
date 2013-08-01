var express = require('express'),
    fs = require('fs');

var app = express();

app.get('/contribution/:slug/:year/:location', function(req, res){
  var locationType = '';

  if (!Number(req.params.location) && req.params.location.length == 2) {
    locationType = 'state';
  } else if (Number(req.params.location)) {
    locationType = 'ward';
  } else {
    locationType = 'county';
  }

  res.send({
    slug: req.params.slug,
    year: req.params.year,
    location: req.params.location,
    locationType: locationType
  });
});

var port = process.env.PORT || 3000;
app.listen(port);

console.log('Express started on port ' + port);