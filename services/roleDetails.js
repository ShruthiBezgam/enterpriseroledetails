const https = require('https');
const config = require('../config/config');
const { Console } = require('console');

/* GET RoleDetails from Saviynt*/

const callSaviynt = (username, token) => {
    var body =
        { username: username };

    const options = {
        hostname: `${config.SVNYT_SERVICES_URL}`,
        path: `${config.LOGIN_ENDPOINT}`,
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json',
            'Content-Length': JSON.stringify(body).length,
        },
        rejectUnauthorized: false,
        requestCert: true,
        agent: false,
    };

    return new Promise((resolve, reject) => {
        const httpsReq = https.request(options, (response) => {
            let result = '';
            response.on('data', chunk => {
                result += chunk;
            });
            response.on('end', () => {
                console.log('Role Details: Promise resolved from Saviynt', result);

                if (result && JSON.parse(result).Roledetails.length > 0) {
                    return resolve(JSON.parse(result));
                }

                return reject("No Data found");
            });
            response.on('error', err => {
                console.log('Role Details: Promise rejected from Saviynt', result);
                reject(err);
            });
        });

        httpsReq.write((JSON.stringify(body)));
        httpsReq.end();
    });

}

module.exports = {
    callSaviynt,
};