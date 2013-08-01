var models = require('./models'),
    Contribution = models.Contribution;

var testData = [
  {
    slug: 'jannie-blackwell',
    year: 2011,
    state: 'tx',
    amount: 4500.00,
    date: new Date('01.02.2012'),
    contributor: 'Joe Smith'
  },
  {
    slug: 'jannie-blackwell',
    year: 2012,
    ward: 40,
    county: 'philadelphia',
    state: 'pa',
    amount: 100.00,
    date: new Date('01.20.2011'),
    contributor: 'Jane Smith'
  },
];

Contribution.collection.insert(testData, {}, function(err) { console.log(err); });