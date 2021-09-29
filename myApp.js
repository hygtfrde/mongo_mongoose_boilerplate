require('dotenv').config();

var mongoose = require('mongoose'); 
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//--------------------------------------------------------------------
//---------- SCHEMA
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
//---------- MODEL
const Person = mongoose.model("Person", personSchema);

//--------------------------------------------------------------------
// Callback functions take the ERROR FIRST, then the DATA if successful 
//--------------------------------------------------------------------

//--------------------------------------------------------------------
//---------- CREATE AND SAVE

const createAndSavePerson = (done) => {
  var superImportantGuy = new Person({
    name: "superImportantGuy", 
    age: 100, 
    favoriteFoods: ["pork", "beans", "salsa"]
  });

  superImportantGuy.save(function(err, data) {
    if (err) {
      console.error(err);
      return err; 
    } 
    else {
      done(data); 
    }
  });
};

//--------------------------------------------------------------------
//---------- CREATE MANY AND SAVE 

const arrayOfPeople = [
  {name: 'Bob', age: 22, favoriteFoods: ['beef','onions']},
  {name: 'Mary', age: 42, favoriteFoods: ['squash','peas']}
]; 

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) {
      console.error(err);
      return err; 
    } else {
      done(null, data); 
    }
  })
};

//--------------------------------------------------------------------
//---------- FIND ALL BY  

const findPeopleByName = function(personName, done) {
  Person.find({name: personName}, function (err, personFound) {
    if (err) {
      return console.log(err);
    }
    done(null, personFound);
  });
};

//--------------------------------------------------------------------
//---------- FIND ONE BY 

const findOneByFood = function(food, done) {
  Person.findOne({favoriteFoods: food}, function (err, data) {
    if (err) {
      return console.log(err);
    }
    done(null, data);
  });
};

//--------------------------------------------------------------------
//---------- FIND BY _ID

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if(err) {
      return console.log(err);
    }
    done(null, data); 
  })
};

//--------------------------------------------------------------------
//----------

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

//--------------------------------------------------------------------
//----------

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

//--------------------------------------------------------------------
//----------

const removeById = (personId, done) => {
  done(null /*, data*/);
};

//--------------------------------------------------------------------
//----------

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

//--------------------------------------------------------------------
//----------

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};



//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
