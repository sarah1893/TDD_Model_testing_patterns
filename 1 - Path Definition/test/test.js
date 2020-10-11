console.log = function() {};
const assert = require('chai').assert;
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('./models/dinosaur.js', 'utf8');

describe('Checkpoint 8', () => {
 it('defines a DinosaurSchema with name', () => {

 let structure1 = function() { 
     const DinosaurSchema = new Schema({
       $name: {type: $string}
    });
 }; 
 let structure2 = function() { 
     const DinosaurSchema = new Schema({
       $name: $string
    });
 }; 

    let varCallbacks = [
      function($DinosaurSchema, $name, $string) {
        if ($name.name !== 'name') {
          return {failure: 'Add a path called name'};
        } else if ($string.name !== 'String') {
          return {failure: '`name` path should be of type String'};
        } else {
          return true;
        }
      }
    ];

 // assert that structure matches
 let isMatch1 = Structured.match(code, structure1, {varCallbacks: varCallbacks});
 let isMatch2 = Structured.match(code, structure2, {varCallbacks: varCallbacks});
 let failureMessage = varCallbacks.failure || 'Add a `name` path to `DinosaurSchema`.';
 assert.isOk(isMatch1 || isMatch2, failureMessage);
 });
});
