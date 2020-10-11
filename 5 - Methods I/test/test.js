console.log = function() {};
const assert = require('chai').assert;
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('./models/dinosaur.js', 'utf8');

describe('Checkpoint 7', () => {
 it('adds body to findByName', () => {

 let structure = function() { 
      DinosaurSchema.statics.findByName = function($name, $cb) {
        return this.$findOne({ name: $name }, $cb);
      };
 }; 

    let varCallbacks = [
      function($findOne) {
        if ($findOne.name !== 'findOne') {
          return {failure: "Within the function, call `this.findOne`"};
        } else {
          return true;
        }
      }
    ];

 // assert that structure matches
 let isMatch = Structured.match(code, structure, {varCallbacks: varCallbacks});
 let failureMessage = varCallbacks.failure || 'Add the provided body to `findByName`';
 assert.isOk(isMatch, failureMessage);
 });
});

