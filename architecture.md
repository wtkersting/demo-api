# Architecture

This repository follows a strict filestructure in order to provide a logical template for adding new routes with ease:

```
.
|
└─ src/
|  |─ routes/
|  |  |─ route.../
|  |  |  |─ controller.js
|  |  |  |─ service.js
|  |  |  |─ helper.js
|  |  |  └─ subRoute.../
|  |  |     |─ controller.js
|  |  |     |─ service.js
|  |  |     └─ helper.js
|  |  |
|  |  └─ route...
|  |     |─ controller.js
|  |     |─ service.js
|  |     └─ helper.js
|  |
|  └─ utils/
|     |─ xUtils.js
|     |─ yUtils.js
|     └─ zUtils.js
|
└─ test/
   |─ mocks/
   |  |─ routes/
   |  |  └─ route.../
   |  |     |─ service.js
   |  |     |─ helper.js
   |  |     └─ subRoute.../
   |  |        |─ service.js
   |  |        └─ helper.js
   |  |
   |  └─ utils/
   |     |─ xUtils.test.js
   |     |─ yUtils.test.js
   |     └─ zUtils.test.js
   |
   |─ routes/
   |  └─ route.../
   |     |─ service.test.js
   |     |─ helper.test.js
   |     └─ subRoute.../
   |        |─ service.test.js
   |        └─ helper.test.js
   |
   └─ utils/
      |─ xUtils.test.js
      |─ yUtils.test.js
      └─ zUtils.test.js
```

## routes

Each folder inside the routes directory represents a new route including at least 1 `controller.js` and 1 `service.js` file. Optionally if any helper functions are necessary, they can reside in a `helpers.js` file in the same directory

Often times a route will contain one or more subroutes, or routes that may expose more granular data pertaining to the base route's subject. For example, if we take a vehicles API that is connected to a database which contains vehicle information, we may start with a base route of `/vehicles` which should return an array of all vehicles:

```json
[
  {
    "id": 1,
    "make": "Subaru",
    "model": "WRX STI",
    "year": "2018"
  },
  {
    "id": 2,
    "make": "Subaru",
    "model": "BRZ",
    "year": "2015"
  },
  {
    "id": 3,
    "make": "Mitsubishi",
    "model": "Eclipse",
    "year": "2008"
  },
  ...
]
```

Now we have an api `/vehicles` which returns a list of all vehicles in our database, however, you can notice that this just returns only basic details about a vehicle: `id`, `make`, `model`, and `year`. This is certainly fine enough for most applications of listing vehicles, but if you wanted to get more details on a given vehicle, then we can introduce a subroute to retrieve the fine details on a given vehicle: `/vehicles/{id}` which could return something that looks like this:

```
GET /vehicles/1
```

```json
{
  "id": 1,
  "make": "Subaru",
  "model": "WRX STI",
  "year": "2018",
  "engine": "2.5 L H-4",
  "horsepower": 310,
  "torque": 290,
  "tireSize": "P245/35R19"
  ...
}
```

In addition to adding more granular, ID-based subroutes, we could also expose subroutes to list data for vehicle makes such as `/vehicles/makes` which could look like:

```json
[
  {
    "make": "Subaru"
  },
  {
    "make": "Mitsubishi"
  },
  {
    "make": "Honda"
  },
  ...
]
```

### controller.js

The controller of a route should define any methods that are available to a given route. If there are any sub-routes after a given route, for example `/foo/bar`, those should be imported and used inside the controller. For example in this block of code used in the `foo/controller.js` file.

```javascript
// Import and use all subroutes
const barController = require("./bar/controller")

router.use("/bar", barController)
```

### service.js

The service for a given route should be where all logic lives. The purpose of a service file is to expose any functionality that pertains to a given route. For example, if a route calls for data from multiple outside services, the service file is where that aggregation and / or filtering should take place.

The reason to keep all logic inside of a service is to be able to expose the service functionality throughout the application to increase developer ergonomics and reduce potential code duplication.

### helpers.js

The purpose of a helpers file is to provide a location to put functions that may be used across multiple service functions, particularly verbose sql queries, or even business-logic computations for a given route. These files are not always necessary, but they can be beneficial for increasing code readability and again, developer ergonomics and code-duplication reduction.

## Utils

Utils are files or functions which can be or are used across the whole repository. For example, if there is a common external service used from multiple api points or services, we would create a utility file with notation `externalServiceUtils.js` to interact with the external service.

One example of an external service could be a foreign API such as Google or Twilio, but another example could be the layer we use to interact with a database.

In the instance of a database utility, it would make sense to define a separate folder to host individual database table functons and utilities. Take, for example the following file structure:

```
.
└─ utils/
   |─ google.js
   |─ twilio.js
   |
   └─db
     |─ vehicles.js
     |─ customers.js
     └─ ...
```

Inside our google or twilio utils, we would include functions that are helpful throughout the repo and not too specific to any given service. Inside the db utils it would be beneficial to include the standard database operations such as `INSERT`, `SELECT`, `UPDATE`, and `DELETE`. Defining each of these methods in a db utility is particularly useful when designing a CRUD API application. If more complicated `SELECT` statements are necessary, those can be written inside a given route's service or helpers file.

## Tests

For tests we use mocha and chai's assert library for consistent unit testing of all route services and helpers in addition to any utilities.

The file structure of the test directory should follow the exact pattern of the src directory in addition of the `mocks/` directory in order to maintain consistency within the repo.
