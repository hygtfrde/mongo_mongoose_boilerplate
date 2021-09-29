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
  {name: 'Mary', age: 42, favoriteFoods: ['squash','peas', 'hamburger']},
  {name: 'Charlie', age: 32, favoriteFoods: ['ham','carrots', 'hamburger']},
  {name: 'Chistine', age: 26, favoriteFoods: ['bread','butter']}
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
//---------- FIND + EDIT + SAVE 

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';
  // 1) findById
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  // 2) Edit/Update returned object
    person.favoriteFoods.push(foodToAdd);
  // 3) Save object with updated property 
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

//--------------------------------------------------------------------
//---------- FIND AND UPDATE 

const findAndUpdate = (personName, done) => {
  // 1) document to find {name: personName}
  // 2) field to change {age: ageToSet}
  // 3) return updated document with {new: true} 
  const ageToSet = 20;

  Person.findOneAndUpdate(
    {name: personName}, 
    {age: ageToSet}, 
    {new: true}, 
    (err, updatedDoc) => {
      if(err) {
        return console.log(err);
      }
      done(null, updatedDoc);
    }
  )
};

//--------------------------------------------------------------------
//---------- FIND BY _ID AND REMOVE

var removeById = function(personId, done) {
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if(err) {
        return console.log(err);
      }
      done(null, removedDoc);
    }
  ); 
};

//--------------------------------------------------------------------
//---------- REMOVE ALL WHERE 

/*
[MONGODB DRIVER] Warning: collection.remove is deprecated. 
Use deleteOne, deleteMany, or bulkWrite instead.
*/

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, (err, response) => {
    if(err) {
      return console.log(err);
    }
    done(null, response);
  })
};

//--------------------------------------------------------------------
//---------- CHAIN QUERIES: FIND + SORT + LIMIT + SELECT + EXEC

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};const queryChain = function(done) {
  var foodToSearch = "burrito";
  Person.find({favoriteFoods:foodToSearch}).sort({name : 1})
  .limit(2).select({age:0})
  .exec((err, data) => {
     if(err){
       done(err);
     }
    done(null, data);
  })
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
