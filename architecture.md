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

## src

### routes

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
