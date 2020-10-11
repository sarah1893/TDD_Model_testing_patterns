# Hooks

Before getting any further, let’s recall some good TDD practices:
- make your tests *expressive* by writing them in four phases
- make your tests *isolated* with setup and teardown phases
- follow the [red, green, refactor cycle](https://content.codecademy.com/programs/tdd-js/articles/red-green-refactor-tdd.png)
    The red, green, refactor approach helps developers compartmentalize their focus into three phases:
    - Red — think about what you want to develop
    - Green — think about how to make your tests pass
    - Refactor — think about how to improve your existing implementation

In this lesson you will be writing your setup and teardown phases in ``beforeEach`` and ``afterEach`` hooks provided by [Mocha](https://mochajs.org/).

Before each test, your ``beforeEach`` hook will [connect](http://mongoosejs.com/docs/api.html#index_Mongoose-connect) to the database and [drop](https://docs.mongodb.com/manual/reference/method/db.dropDatabase/) any old data using these method calls:
```javascript
await mongoose.connect(databaseUrl, options);
await mongoose.connection.db.dropDatabase();
```

After each test, your ``afterEach`` hook will [disconnect](http://mongoosejs.com/docs/api.html#index_Mongoose-disconnect) from the database with
```javascript
await mongoose.disconnect();
```

You can refactor these hooks by wrapping the three calls in two helper functions: ``connectAndDrop`` and ``disconnect``. In your test file, import those functions and add them to your hooks.

## Instructions

1. A ``#save`` test has been added to further drive development. Run the tests by entering ``npm test`` in the terminal.

> Hint
> Run npm test in the terminal. Wait for output before checking work.

2. You should get a ``Timeout`` error — Mocha is waiting for a connection that doesn’t exist yet. Add this under the first ``describe``:
```javascript
  beforeEach( async () => {
    await mongoose.connect(databaseUrl, options);
  });

  afterEach( async () => {
    await mongoose.disconnect;
  });
```

3. Run the tests and see green.

4. Run the tests again and see red!

    AssertionError: expected 2 to equal 1

This error is telling you that there are 2 documents found, when 1 was expected. Your test is not *isolated* — the document added in the previous test run still exists in the database.

5. In the ``beforeEach`` hook after the call to ``connect``, add
```javascript
await mongoose.connection.db.dropDatabase();
```

This drops any old data in the database.

6. Run the test suite and see green!

7. Time to refactor. The two helper functions ``connectAndDrop`` and ``disconnect`` have been defined for you in **database.js**. Import the functions at the top of **dinosaur-test.js** by replacing ``{mongoose, databaseUrl, options}`` with ``{connectAndDrop, disconnect}``.

8. Delete the contents of the ``beforeEach`` hook, including ``async () => {...}``.

Pass the argument ``connectAndDrop`` to the ``beforeEach`` function.

9. Delete the contents of the ``afterEach`` hook, including ``async () => {...}``.

Pass the argument ``disconnect`` to the ``afterEach`` function.

10. Run the tests to confirm that you’re still in the green.

## Question

What does a Timeout error mean?

## Answer

A Timeout error is commonly generated when an action or command is wating for data that is not coming in, for example in this exercise 6 we are trying to test the database and we hope for a connection, but we never receive confirmation that the connection has been succesful, therefore the program is stopped and the Timeout executed to let us know that there was no successful connexion. To evade this kind of problem, you will have to implement beforeEach and afterEach methods to stablish that connection with the database.