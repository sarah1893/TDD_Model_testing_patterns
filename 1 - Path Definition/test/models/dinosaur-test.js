const Dinosaur = require('../../models/dinosaur');
const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');

describe('Dinosaur', () => {

  describe('#name', () => {
    it('is a String', () => {
      const dino = new Dinosaur({
        name: 'T-rex'
      });
      
      assert.strictEqual(dino.name, 'T-rex')


    });
  });
});
