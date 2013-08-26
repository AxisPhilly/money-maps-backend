var csv = require('csv'),
    fs = require('fs'),
    moment = require('moment'),
    states = {"Alabama":"AL","Alaska":"AK","American Samoa":"AS","Arizona":"AZ","Arkansas":"AR","California":"CA","Colorado":"CO","Connecticut":"CT","Delaware":"DE","District of Columbia":"DC","Federated States Of Micronesia":"FM","Florida":"FL","Georgia":"GA","Guam":"GU","Hawaii":"HI","Idaho":"ID","Illinois":"IL","Indiana":"IN","Iowa":"IA","Kansas":"KS","Kentucky":"KY","Louisiana":"LA","Maine":"ME","Marshall Islands":"MH","Maryland":"MD","Massachusetts":"MA","Michigan":"MI","Minnesota":"MN","Mississippi":"MS","Missouri":"MO","Montana":"MT","Nebraska":"NE","Nevada":"NV","New Hampshire":"NH","New Jersey":"NJ","New Mexico":"NM","New York":"NY","North Carolina":"NC","North Dakota":"ND","Northern Mariana Islands":"MP","Ohio":"OH","Oklahoma":"OK","Oregon":"OR","Palau":"PW","Pennsylvania":"PA","Puerto Rico":"PR","Rhode Island":"RI","South Carolina":"SC","South Dakota":"SD","Tennessee":"TN","Texas":"TX","Utah":"UT","Vermont":"VT","Virgin Islands":"VI","Virginia":"VA","Washington":"WA","West Virginia":"WV","Wisconsin":"WI","Wyoming":"WY"},
    output = [];

csv()
  .from(__dirname + '/contributions.csv', { columns: true, delimiter: '\t' })
  .on('record', function(data, index) {
    if(!data.date) {
      data.date = data.year;
    }

    if(!data.county) {
      data.county = '';
    }

    if(!data.state) {
      data.state = '';
    }

    var fDate = moment(data.date).format('L');
    var fCounty = data.county.toLowerCase();
    var fState = data.state.toLowerCase();

    var item = {
      slug: data.slug,
      year: Number(data.year),
      ward: Number(data.ward),
      county: fCounty,
      state: fState,
      amount: Number(data.amount),
      date: fDate,
      contributor: data.contributor
    };

    output.push(item);
  })
  .on('end', function(count) {
    fs.writeFile(__dirname + '/contributions.json', JSON.stringify(output, null), function(err) {
      if(err) {
        console.log(err);
      } else {
        console.log('JSON saved to ' + __dirname + '/contributions.json');
      }
    });
  })
  .on('error', function(error) {
    console.log(error.message);
  });