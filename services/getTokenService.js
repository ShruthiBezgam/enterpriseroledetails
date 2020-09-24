const https = require('http');
const HttpStatus = require("http-status-codes");
const config = require('../config/config');

/* GET Token for the user*/

getAdminToken = () => {
  const options = {
    hostname: `${config.EC2_INSTANCE_URL}`,
    path: `${config.EC2_ENDPOINT}`,
    port: `${config.EC2_INSTANCE_PORT}`,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    rejectUnauthorized: false,
    requestCert: true,
    agent: false,
  };

  return new Promise((resolve, reject) => {
    const httpsReq = https.request(options, response => {
      let result = '';
      response.on('data', chunk => {
        result += chunk;
      });
      response.on('end', () => {

        if (response.statusCode === HttpStatus.OK) {
          var access_token = JSON.parse(result).access_token;
          if (access_token.length > 0) {
            return resolve(access_token);
          }
        }
        return reject(response.statusCode);
      });
      response.on('error', err => {
        reject(err);
      });
    });

    httpsReq.end();
  });

}

module.exports = {
  getAdminToken,
};