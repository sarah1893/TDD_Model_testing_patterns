# Path Validation I

According to the Department of Dino Zoo Control (DDZC), the zoo isn’t safe with more than 10 of any one type of Dinosaur.

At this point your Dinosaur model has ``name``, ``count``, and ``risk`` properties and you have some server tests written. One of those tests expects a warning message when adding more than 10 dinosaurs, but you receive the following error message:

    AssertionError: expected '' to equal 'Cannot hold more than 10 dinosaurs.'

This error occurred because the Dinosaur model has no validation! You can ensure the safety of the zoo by adding a validator function.

In this exercise you’ll be using a [custom validator function](http://mongoosejs.com/docs/api.html#schematype_SchemaType-validate). It receives the value to validate as its first argument. It returns a Boolean, which is ``false`` if the value fails validation. Avoid arrow notation ``() =>``. Using ``function()`` notation preserves the proper binding of ``this``. Here’s the syntax:

```javascript
// Define validator
validate = function (value) {
  ...
}

// Add validator to Schema
const DinosaurSchema = new Schema({
  count: {
    type: Number,
    validate: [validator, 'custom err msg']
  }
});
```

Since validation is a model-level concern, you’ll need to test at the model layer. You can test validation like this:
1. Create an instance of a model with validators and execute the validations with the ``validateSync`` method. Any validation errors will be stored in ``[instance].errors.[path]``, like ``dino.errors.count``.
2. Make assertions on ``[instance].errors.[path]`` and its properties.
For more information on validators visit the Validation section of the Mongoose guide: http://mongoosejs.com/docs/validation.html.

## Instructions

1. Using TDD, ensure that a dinosaur cannot have a ``count`` of more than ``10``. The ``count`` and ``risk`` paths have already been defined for you.

In **dinosaur-test.js** under ``it('is invalid with 11'`` construct a new instance of the Dinosaur model with
- name ``'T-rex'``
- count ``11``
- risk ``'High'``
and store it in a variable ``dino``.

> Hint
> Create a **``const``** variable called **``dino``**.
> Use the **``new Dinosaur(obj)``** constructor where **``obj``** is an object with the above key-value pairs.

2. Call ``dino.validateSync()`` after that.

> Hint
> Call the function within the **``is invalid with 11 it``** block.

3. If there are any errors, they will be stored in ``dino.errors``.
- Use ``assert.ok`` to confirm that ``dino.errors`` exists
- Pass the custom error message ``'model should have validation error'`` as a second argument to ``assert.ok``

> Hint
> Call **``assert.ok``** within the **``is invalid with 11 it``** block.

4. Run ``npm test`` and see the error message


``    AssertionError: model should have validation error: expected undefined to be truthy``

> Hint
> Run **``npm test``** in the terminal. Wait for output before checking work.

5. The ``errors`` object is undefined, which means no error is thrown! In **dinosaur.js** add
```javascript
validate: validator
```
to the ``count`` property. You’ll define the ``validator`` function soon.

> Hint
> Add the property within the **``count``** path after the **``type``** property.

6. Run ``npm test`` and see the error message

``ReferenceError: validator is not defined``

> Hint
> Run **``npm test``** in the terminal. Wait for output before checking work.

7. Above the ``DinosaurSchema`` declaration in **dinosaur.js**, define a function named ``validator`` with ``function(args) {}`` notation.

> Hint
> Define a **``const``** variable called **``validator``** and set it equal to an empty function.

8. Run ``npm test`` and see the ``AssertionError`` message reappear. The ``validator`` function needs to return ``false`` to raise a validation error.

> Hint
> Run **``npm test``** in the terminal. Wait for output before checking work.

9. Make ``validator`` return ``false``.

> Hint
> Add **``return false``** to the body of the function.

10. Run ``npm test`` and see green!

> Hint
> Run **``npm test``** in the terminal. Wait for output before checking work.

## Question

**What does validateSync do?**

## Answer

It executes all registered validation rules for a document, skipping all asyncronous ones, for example calling validateSync() on a document created from this schema:
```javascript
const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 200
    },
    publisher: String,
    tags: {
        type: [String],
        validate: {
            validator: function (v) {
                return v.length > 1
            },
            message: 'You must provide more than 1 tag.'
        }
    },
    date: { type: Date, default: Date.now },
    onSale: Boolean,
    price: {
        type: Number,
        required: function () { return this.onSale }
    }
});
```

would check if title exists, that it is at least 4 characters and no more than 200, that tags has at least one, and that price exists if onSale is true. Under those conditions validateSync would allow us to create the following document:
```javascript
const game = new Game({
        title: "Pacman",
        publisher: "Nintendo",
        tags: ["arcade"],
        onSale: true,
        price: 29.99
    });
```