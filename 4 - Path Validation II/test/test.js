console.log = function() {};
const assert = require('chai').assert;
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('./models/dinosaur.js', 'utf8');

describe('Checkpoint 9', () => {
 it('switches to max validator', () => {

 let structure = function() { 
     const DinosaurSchema = new Schema({
       count: {
         $max: [$10, $msg] 
       }
    });
 }; 

    let varCallbacks = [
      function($max, $10) {
        if ($max.name !== 'max') {
          return {failure: 'Use `max` within `count` path'};
        } else if ($10.value !== 10) {
          return {failure: 'Maximum value must be 10'};
        } else {
          return true;
        }
      }
    ];

 // assert that structure matches
 let isMatch = Structured.match(code, structure, {varCallbacks: varCallbacks});
 let failureMessage = varCallbacks.failure || 'Switch to max validator within `count` path';
 assert.isOk(isMatch, failureMessage);
 });
});

