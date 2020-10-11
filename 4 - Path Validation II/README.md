# Path Validation II

Your test passes and the model technically satisfies the DDZC’s no-more-than-10 regulation. But as it currently exists, there are two issues:
- the validation error message is not helpful, and
- the validation function will invalidate a count of any value.

Before you write the code to fix the issues, you’ll need more failing tests.
Remember that validation error messages are defined in the schema like this:
```javascript
age: {
   type: Number,
   validate: [validator, 'Age must be above 9.']
}
```

And you can assert the value of multiple properties of ``[instance].errors.[path]`` like ``message``, ``path``, ``kind``, and ``name``. You can write out multiple assertions or use [assert.include](http://chaijs.com/api/assert/#method_include):
```javascript
  const errorInfo = person.errors.age;
  assert.include(errorInfo, {
    message: 'Age must be above 9.',
    path: 'age',
    kind: 'user defined',
    name: 'ValidatorError'
  });
```

The complete list of validators are available here: http://mongoosejs.com/docs/schematypes.html.

## Instructions

1. In **dinosaur-test.js** at the end of the ``'is invalid with 11'`` test, assert that ``dino.errors.count.message`` strictly equals ``'Cannot hold more than 10 dinosaurs.'``.

2. Run the test suite and see the error message:

``    AssertionError: expected 'Validator failed for path `count` with value `11`' to equal 'Cannot hold more than 10 dinosaurs.'``

> **Hint**
> Run ``npm test`` in the terminal. Wait for output before checking work.

3. Add the validation error message ``'Cannot hold more than 10 dinosaurs.'`` in **dinosaur.js**. Don’t forget to use square ``[ ]`` brackets!

4. Run the test suite and see green. Time to solve the second issue.

> **Hint**
> Run ``npm test`` in the terminal. Wait for output before checking work.

5. In **dinosaur-test.js** below the ``is invalid with 11`` test, add the following test.
```javascript
    it('is valid with 10', () => {
      const dino = new Dinosaur({
        name: 'Triceratops',
        count: 10,
        risk: 'Low'
      });

      dino.validateSync();

      assert.isUndefined(dino.errors, 'model should be valid');
    });
```

6. Run the test suite and see red. This will drive the implementation of the ``validator`` function, which is currently invalidating every value.

> **Hint**
> Run ``npm test`` in the terminal. Wait for output before checking work.

7. Change the ``validator`` function to look like this
```javascript
const validator = function(value) {
  return value <= 10; 
};
```

> **Hint**
> In **dinosaur.js**, make sure that ``validator`` accepts one argument called ``value``.

8. Run the test suite and see green!

> **Hint**
> Run ``npm test`` in the terminal. Wait for output before checking work.

9. Time to refactor: The validator function can be replaced by a built-in validator provided by Mongoose, ``max``. Replace the ``validate`` property with
```javascript
max: [10, 'Cannot hold more than 10 dinosaurs.']
```

> **Hint**
> Change the ``validate`` property in **dinosaur.js**:
> - Replace ``validate`` with ``max``
> - Replace ``validator`` with ``10``

10. Run the test suite and see green!

> **Hint**
> Run ``npm test`` in the terminal. Wait for output before checking work.


## Question

**When to use validate and when to use a validator with mongoose?**

## Answer

It is mainly related to the scope of what we need to check for, most times using a validator will be a perfect solution since, even though limited, mongoose has a variety of validators that span towards most common cases, for example, if the data inputted is a date, we can use min and max to create a margin just like with numbers:
ie, with our dinosaur schema:
```javascript
const date = new Date();

const DinosaurSchema = new Schema(
  {
    name: {type: String, required: true},
    count: {
      type: Number,
      max: [10, 'Cannot hold more than 10 dinosaurs.']
    },
    year: {
      type: Date,
      min: [date.getFullYear() - 60, 'Cannot be older than 1958'] // I am certainly unsure about what kind of dinosaur I would be referring to...
    },
    risk: {type: String}
  }
);
```

But a moment we might need to use validate if for example if we wanted dinosaurs whose year is only an even number (using our good friend modulus %):
```javascript
const date = new Date();

const validator = function(val){
  return val % 2;
}

const DinosaurSchema = new Schema(
  {
    name: {type: String, required: true},
    count: {
      type: Number,
      max: [10, 'Cannot hold more than 10 dinosaurs.']
    },
    year: {
      type: Date,
      validate: validator//let's thing we are talking about people in a disrespectful way
    },
    risk: {type: String}
  }
);
```