# Methods I

Now that you’ve tested the persistence of data, you’ll need methods to access that data.

Mongoose schemas support
- *static methods*: methods called by a model. They typically operate on a collection of documents (instances of the model).
- *instance methods*: methods called by an instance of a model. They typically operate on the document (model instance) itself.

From the previous exercise, you might recognize ``Dinosaur.findOne()`` as a static method and ``dino.save()`` as an instance method.

Sometimes you need to define additional methods for your application, like if you see a server-level error such as this:

``TypeError: Dinosaur.findByName is not a function``

This server test is failing because there is no model method to find Dinosaurs by name. You’ll need to drop to the model layer and write more tests.

The desired query is performed on a collection of documents, so it requires a static method, which is defined in ``[schema].statics`` and called according to the example below.
```javascript
// static method - implementation
DinosaurSchema.statics.findByName = function(name, callback) {
  return this.findOne({ name: name }, callback);
};
// static method - call the method
await Dinosaur.findByName('Velociraptor')
```

Use ``function()`` notation instead of arrow ``=>`` notation to properly bind ``this``.

You can test-drive the development of this method just like any other JavaScript method: Call the method and make assertions on its output.

## Instructions

1. Test-drive the static method ``findByName(name)``, which returns the first document that matches a given ``name``.

In **dinosaur-test.js** under ``it('returns the first match on name'`` (scroll to the bottom of the file) add the following setup:
```javascript
      const fields = {
        name: 'Pterodactyl',
        count: 5,
        risk: 'Low'
      };
      const dino = new Dinosaur(fields);
      await dino.save();
```

> **Hint**
> Scroll to the bottom of the file to find the **``it``** block.
> Paste the provided code into that block.

2. Call ``await Dinosaur.findByName('Pterodactyl')`` and store the result in a variable named ``stored``.

> **Hint**
> Make sure to:
> - create a **``const``** called **``stored``**
> - use **``await``**
> - spell **``findByName``** correctly

3. Using [assert.include](http://chaijs.com/api/assert/#method_include), assert that ``stored`` contains the same key-values pairs as ``fields``.

4. Run ``npm test`` and see the error message

``TypeError: Dinosaur.findByName is not a function``

> **Hint**
> Run **``npm test``** in the terminal. Wait for output before checking work.

5. In **dinosaur.js**, define an empty ``findByName`` method in ``DinosaurSchema.statics``.

Use ``function() {}`` notation.

6. Run **``npm test``** and see the error message

``AssertionError: Target cannot be null or undefined.``

> **Hint**
> Run ``npm test`` in the terminal. Wait for output before checking work.

7. In **dinosaur.js**, add the implementation code provided in the narrative above.
Make sure to add ``name`` and ``callback`` parameters to the function.

> **Hint**
> The code for ``.findByName`` is provided in the narrative section above.

8. Run ``npm test`` and see green!

> **Hint**
> Run ``npm test`` in the terminal. Wait for output before checking work.