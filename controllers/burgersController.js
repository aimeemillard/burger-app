// var express = require("express");

// var router = express.Router();
// var burger = require("../models/burger.js");

// // get route -> index
// router.get("/", function (req, res) {
//   res.redirect("/burgers");
// });

// router.get("/burgers", function (req, res) {
//   // express callback response by calling burger.selectAllBurger
//   burger.all(function (burgerData) {
//     // wrapper for orm.js that using MySQL query callback will return burger_data, render to index with handlebar
//     res.render("index", { burger_data: burgerData });
//   });
// });

// // post route -> back to index
// router.post("/burgers/create", function (req, res) {
//   // takes the request object using it as input for burger.addBurger
// });

// // put route -> back to index
// router.put("/burgers/:id", function (req, res) {
//   burger.update(req.params.id, function (result) {});
// });

// module.exports = router;

var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function (req, res) {
  burger.selectAll(function (data) {
    var hbsObject = {
      burgers: data,
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function (req, res) {
  burger.insertOne(["burger_name"], [req.body.burger_name], function (result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);
  console.log(req.body);
  burger.updateOne(
    {
      devoured: req.body.devoured || false,
    },
    condition,
    function (result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});

router.delete("/api/burgers/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  burger.delete(condition, function (result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

// Export routes for server.js to use.
module.exports = router;
