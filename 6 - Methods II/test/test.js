console.log = function() {};
const assert = require('chai').assert;
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('./models/dinosaur.js', 'utf8');

describe('Checkpoint 7', () => {
 it('adds body to breed', () => {

 let structure1 = function() { 
      DinosaurSchema.methods.breed = function() {
        this.$count = this.$count + 1;
      };
 }; 

 let structure2 = function() { 
      DinosaurSchema.methods.breed = function() {
        this.$count++;
      };
 }; 

    let varCallbacks = [
      function($count) {
        if ($count.name !== 'count') {
          return {failure: "Within the function, call `this.count`"};
        } else {
          return true;
        }
      }
    ];

 // assert that structure matches
 let isMatch1 = Structured.match(code, structure1, {varCallbacks: varCallbacks});
 let isMatch2 = Structured.match(code, structure2, {varCallbacks: varCallbacks});
 let failureMessage = varCallbacks.failure || 'Add the provided body to `breed`';
 assert.isOk(isMatch1 || isMatch2, failureMessage);
 });
});

