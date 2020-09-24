const tokenService = require('./getTokenService');
const service = require('./roleDetails')

/* Service for Enterprise GET Role Details.*/

getRoleDetails = (req, res) => {
  var token;
  tokenService.getAdminToken().then(result => {
    var body = {
      username: req.body.username
    };

    token = result;

    service.callSaviynt(req.body.username, token).then(saviyntResp => {

      if (undefined == saviyntResp || null == saviyntResp || "" == saviyntResp) {
        res.json("Invalid response from Saviynt")
      } else {
        res.status(200)
        res.json(saviyntResp);
      }
    })
      .catch(err => {
        res.status(400);
        res.json("Bad request from SaviyantCall  " + err);
      })

  }
  ).catch(err => {
    res.status(404);
    res.json("Bad request from token API " + err);
  })
}
module.exports = {
  getRoleDetails,
};