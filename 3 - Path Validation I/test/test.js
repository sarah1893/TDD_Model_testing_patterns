console.log = function() {};
const assert = require('chai').assert;
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('./models/dinosaur.js', 'utf8');

describe('Checkpoint 9', () => {
 it('validator returns false', () => {

 let structure = function() { 
      const validator = function() {
        return false
      }
 }; 

 // assert that structure matches
 let isMatch = Structured.match(code, structure);
 let failureMessage = 'validator must return false';
 assert.isOk(isMatch, failureMessage);
 });
});

