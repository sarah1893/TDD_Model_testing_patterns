# Methods II

Sometimes you need an instance method for your application, like if you see a server-level error such as this:

``TypeError: Dinosaur.findByName is not a function``

This server test expects an increase to the dinosaur ``count``, which is a responsibility of the Dinosaur model. You’ll need to drop to the model layer and test for a ``.breed()`` method.

``.breed()`` will increase the count of one dinosaur. This kind of method is specific to an instance of a model, so you’ll need to define it as an instance method. Do this by storing it in ``[schema].methods`` as shown below.
```javascript
// instance method - implementation
DinosaurSchema.methods.breed = function() {
  this.count = this.count + 1;
};
// instance method - call the method
dino.breed()
```

Use ``function()`` notation instead of arrow ``=>`` notation to properly bind ``this``.

You can test-drive the development of this method just like any other JavaScript method: Call the method and make assertions on its output.

## Instructions

1. In **dinosaur-test.js** under ``it('increases count by 1'`` (scroll to the bottom of the file) add the following setup:
```javascript
      const start = 3;
      const end = 4;
      const dino = new Dinosaur({
        name: 'Stegosaurus',
        count: start,
        risk: 'Low'
      });
```

2. Call ``dino.breed()``.

> **Hint**
> Call ``dino.breed`` in the same ``it`` block.

3. Assert that ``dino.count`` is strictly equal to ``end``.

> **Hint**
> Use ``assert.strictEqual``. The first argument is ``dino.count`` and the second argument is ``end``.
> For this exercise, no variable name other than ``end`` is allowed.

4. Run ``npm test`` and see the error message

``TypeError: dino.breed is not a function``

> **Hint**
> Run **npm test** in the terminal. Wait for output before checking work.

5. In **dinosaur.js**, define an empty ``breed`` method in ``DinosaurSchema.methods``.

Use ``function() {}`` notation.

6. Run npm test and see the error message

``AssertionError: expected 3 to equal 4``

7. In **dinosaur.js**, add the implementation code provided in the narrative above.

> Hint
> In between the braces ``{ }`` add
```javascript
this.count = this.count + 1;
```

8. Run ``npm test`` and see green!

## Question

**What’s the difference between instance and static methods in Mongoose?**

## Answer

As we may recall from the Mongoose fundamentals lesson 18, static methods are methods that directly apply or interact with our model, for example when we wanted to retrieve one dinosaur document from the database we created a find by name static method:
```javascript
DinosaurSchema.statics.findByName
```

it allowed us to go through the database and retrieve the document that matched the given condition (name)

In opposition, instance methods or appended methods created with Mongoose’s ``.methods()`` are known as document methods, since they are only applied per method, not for a database, for example the breed method in our dinosaur schema:
```javascript
DinosaurSchema.methods.breed
```

we need to already have a dinosaur document to manipulate the count property with the breed method, once we have that document:
```javascript
const dino = new Dinosaur({
        name: 'Stegosaurus',
        count: 3,
        risk: 'Low'
      });
```
we can call the method on it:
```javascript
dino.breed();
```
which will increase the number in the count property by one.