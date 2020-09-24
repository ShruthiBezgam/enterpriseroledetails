var express = require('express');
var service = require("../services/enterpriseRoleService.js")
var router = express.Router();

/* Router for GET Role Details. */
router.get('/', function (req, res, next) {
  const username = "awsadmin";

  const account = {
    username: username
  };

  service.getRoleDetails(account).then(result => {
    res.status(200);
    res.json(JSON.parse(result));
  })
    .catch(err => {
      console.log("Error --->", err)
      res.status(500);
      res.json("Server Down");
    });
});

module.exports = router;