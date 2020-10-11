# Introduction

A chat app manages messages, users, and chat rooms. A restaurant app manages customers, tables, and orders. How do applications define these entities and their interactions? The answer is the *model layer*.

Models represent the entities and interactions in a web application’s problem domain: the area of knowledge surrounding a problem. A chat app’s problem domain includes messages, users, and chat rooms; a restaurant’s includes customers, tables, and orders. A model can define each entity, describe the shape of the data stored for each entity, validate the data, store it in a database, and interact with it.

In this lesson, you will learn TDD techniques to develop a model layer using JavaScript with the Mongoose node package and a MongoDB database. For testing, you’ll be using a Mocha test framework and the Chai assertion library.

To better understand the concept of a *model*, take this example: a full-stack web application manages the inventory of a zoo. It can add animals, remove animals, count animals, and store that information for later use. The app can be divided into three layers:
- Front-end: a webpage with buttons to allow users to add and remove animals. Could be implemented with HTML and CSS.
- Server: an application to handle HTTP requests and responses. It routes requests, like the addition and removal of animals, and defines responses, like the count of animals after addition/removal. Could be implemented with Express.
- Database and Models: storage and shape of the animal data. The data is grouped by animal, each with properties like species name, count, and risk-level. These fields and the methods to interact with them are defined by models, and the storage is managed by a database. Could be implemented with Mongoose models and a MongoDB database.

Just like any other software, you can develop models using Test-Driven Development (TDD). The following exercises will help you write tests specific to the model layer.

## Instructions
The zoo for this application keeps a particular type of animal. Get familiar with the data displayed on the right. You will be implementing a model for that data throughout this lesson.


### Question

Why would we want to use tests driven development with models?

### Answer

By performing tests on the models of our application, we make sure that the main functionality performs properly even before we involve other parts of the application that might make finding a bug more difficult, like having interaction with the browser.

Let’s imagine it is a cold day and we need to go outside, we layer up with sweaters and coats and as we walk around we start getting an itch on our arm, because of all the sweaters and coats we cannot find how to scratch that itch. The same way gets to be with bugs in our code, we may get error messages but since it may come from another part of the app, or the browser itself, we will need to trace it to the source. Having tests on our models we make sure that they work properly in close similarity to a real-life situation.

It is not to say that Test Driven Development will only be efficient with models, there are many parts of the app that can be tested, models are just one part.

# Review

You have developed a model using TDD!
- The *model layer* represents entities and interactions in a web app’s problem domain.
- Model paths can be test-driven using validators. Call ``validateSync`` and make assertions on the properties of ``[instance].errors.[path]``.
- The storage of data can be tested [with construction and updating methods](http://mongoosejs.com/docs/models.html) like ``save`` and ``update``. Retrieval can be tested with [query methods](http://mongoosejs.com/docs/queries.html) like ``find``, ``findOne``, and ``findby``.
- *Static methods* are stored in ``[schema].statics`` and *instance methods* are stored in ``[schema].methods``. Both can be tested like any other JavaScript function.

To learn more about Mongoose, read the [guide](http://mongoosejs.com/docs/guide.html) and refer to the [API docs](http://mongoosejs.com/docs/api.html) as needed.