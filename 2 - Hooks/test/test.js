console.log = function() {};
const assert = require('chai').assert;
const fs = require('fs');
const Structured = require('structured');

const code = fs.readFileSync('./test/models/dinosaur-test.js', 'utf8');

describe('Checkpoint 9', () => {
 it('replaces afterEach hook', () => {

 let structure1 = function() { 
      describe('Dinosaur', () => {
        afterEach($disconnect);
      });
    };

    // Incorrect struc includes async
 let structure2 = function() { 
      describe('Dinosaur', () => {
        afterEach( async() => {
          $disconnect
				});
			});
		};

    let varCallbacks = [
      function($disconnect) {
        if ($disconnect.name !== 'disconnect') {
          return {failure: "Expected first argument to `afterEach` to be `disconnect`"};
        } else {
          return true;
        }
      }
    ];

 // assert that structure matches
 let isMatch = Structured.match(code, structure1, {varCallbacks: varCallbacks});
    // assert that structure does not have async
 let isWrong = Structured.match(code, structure2, {varCallbacks: varCallbacks});
 let failureMessage = varCallbacks.failure || 'Replace argument passed to `afterEach`';
    assert.isNotOk(isWrong, 'Do not include `async` in hook');
 assert.isOk(isMatch, failureMessage);
 });
});
