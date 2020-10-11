# Path Definition

In test-driving the zoo application, you receive this error message in the server layer:
    ReferenceError: Dinosaur is not defined

You’re in the red! To get to green you have to drop to the model layer and define the Dinosaur model.

You’ll need multiple model tests to satisfy this server test. Since they don’t touch HTML/CSS selectors nor HTTP actions/status codes, model tests are typically faster than feature-level and server-level tests. Driving the Dinosaur implementation with model tests — rather than feature or server tests — will make your test suite run faster. The model tests will confirm that:
1. the Dinosaur model is defined
2. the Dinosaur model has a path called ``name``

Your first test will cover conditions 1 and 2 by creating an instance of a Dinosaur model with a ``name``, then asserting that the ``name`` path (also referred to as field or property) can be retrieved.

You can review the [Mongoose guide](http://mongoosejs.com/docs/guide.html) for defining a schema and the model documentation for creating models and instances.

## Instructions

1. Write your first model test! In **dinosaur-test.js** under ``it('is a String'``, construct a new instance of the Dinosaur model. Use the constructor ``new Dinosaur()`` and store the result in a variable ``dino``.

2. Run the test and see the error message

    ReferenceError: DinosaurSchema is not defined

> Hint
> Run **``npm test``** in the terminal. Wait for output before checking work.

3. The error directs you to define a Dinosaur schema. In **dinosaur.js** define a Dinosaur schema named ``DinosaurSchema`` without any paths. Use the constructor ``new Schema()``.

4. Run the test and see green!

5. But the test doesn’t check the ``name`` path. In **dinosaur-test.js** within the ``Dinosaur`` constructor, add a ``name`` path with value ``'T-rex'``.

Don’t forget to use braces ``{ }``.

> Hint
> If you need help constructing a model instance with paths, use the Mongoose documentaton at: [mongoosejs.com/docs/models.html](http://mongoosejs.com/docs/models.html).

6. Assert that the name of the dino is strictly equal to ``'T-rex'``.

Use Chai’s assert.[``strictEqual(actual, expected)``(http://chaijs.com/api/assert/#method_strictequal)] method.

> Hint
> If you want more information on Chai’s assertion library, check out the documentation here: [chaijs.com/api/assert](http://chaijs.com/api/assert/).

7. Run the test and see the error message

    AssertionError: expected undefined to equal 'T-rex'

> Hint
> Run **``npm test``** in the terminal. Wait for output before checking work.

8. The error directs you to define a ``name`` path. In **dinosaur.js** define a ``name`` path in the ``Schema`` constructor of type String.

Don’t forget to use braces ``{ }``.

> Hint
> If you need help defining a schema, use the Mongoose guide at: [mongoosejs.com/docs/guide.html](http://mongoosejs.com/docs/guide.html).

9. Run the test and see green!

> Hint
> Run **``npm test``** in the terminal. Wait for output before checking work.


## Question

What is the difference between strictEqual() and equal() in chai?

## Answer

The difference is that each one is related to the identity (``===``) and equality(``==``) operators respectively. If we remember, the == operator will compare for equality *after any necesary* **type** conversions on the values, for example if we are checking for this equality:
``2 == '2' ? true : false;`` which is the same as: ``assert.equal(2, '2')`` .
There we will have a response of **true** because the operator will check across types, turning either 2 into ‘2’(string) or ‘2’ into 2(number) which will lead them to become equal since the character stays the same.

In contrast, ``assert.strictEqual(2, '2')`` and ``2 === '2' ? true : false;`` will return false because the === operator do not do any conversions, it *strictly* checks if the value and the type are the same, if so, it would return true.