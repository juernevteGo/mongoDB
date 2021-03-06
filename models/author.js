var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
      first_name: {type: String, required: true, max: 100},
      family_name: {type: String, required: true, max: 100},
      date_of_birth: {type: Date},
      date_of_death: {type: Date},
    }
  );

  // Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function () {

// To avoid errors in cases where an author does not have either a family name or first name
// We want to make sure we handle the exception by returning an empty string for that case
  var self = this;

  var fullname = '';
  if (self.first_name && self.family_name) {
    fullname = self.family_name + ', ' + self.first_name
  }
  if (!self.first_name || !self.family_name) {
    fullname = '';
  }

  return fullname;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function () {
  var self = this;
  return (self.date_of_death.getYear() - self.date_of_birth.getYear()).toString();
});

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function () {
  var self = this;
  return '/catalog/author/' + self._id;
});

//Export model
module.exports = mongoose.model('Author', AuthorSchema);