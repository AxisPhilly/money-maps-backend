var mongoose = require('mongoose');
mongoose.connect(process.env.MONGOLAB_URI);

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

// Contribution schema
var Contribution = new Schema({
  slug: { type: String, required: true },
  year: { type: Number, required: true },
  ward: { type: Number, required: false },
  muni: { type: String, required: false },
  title: { type: String, require: false },
  county: { type: String, required: false },
  state: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  contributor: { type: String, required: true }
});

mongoose.model('Contribution', Contribution);

var Contribution = exports.Contribution = mongoose.model('Contribution');