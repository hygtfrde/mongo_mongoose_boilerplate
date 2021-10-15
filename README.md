# Mongo Mongoose Boilerplate
A repository for hooking up your Mongo/Mongoose back-end. 

## Software Dependencies
* Node.js
* NPM 
* Mongoose version ~5.4.0 <br> 
NOTE: new version 6.0.8 has TextEncoder bug on older Node versions 

## How It Works 
* Schemas => Models => Document Instances 

## Mongo Local DB Set Up 
* ```mongo --version``` checks the version info
* ```mongod``` start the MongoDB shell 
* ```db``` see current DB 
* ```use <database>``` create and switch to new DB 
## Connect With Node 
* ```npm install mongodb --save``` <br>
```
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://127.0.0.1:27017'
```

## See More At FreeCodeCamp 
[MongoDB and Mongoose Challenges](https://www.freecodecamp.org/learn/apis-and-microservices/mongodb-and-mongoose/)
