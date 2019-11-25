var reqcall = require('request')
var request = require('superagent')
const common = require('../models/common')


module.exports = function (app) {

    app.get('/api/linkedin', async function (req, res) {
        var linkedIn = await common.social_redirect('Linkedin')
        console.log(linkedIn)
        if (linkedIn) {
            res.redirect(linkedIn)
        }
        else {
            res.status(400).send({
                "message": "Error"
            })
        }
    });
    app.get('/auth/linkedin/callback', (req, res) => {
        const code = req.query.code;
        if (!code) {
            return res.status(400).send({
                "message": 'error no code'
            })
        }
        ////console.log("++++++++++++++++++++++++++code+++++++++++++++++++" + code)

        request.post('https://www.linkedin.com/oauth/v2/accessToken')
            .send({ client_id: process.env.LINKEDIN_CLIENTID, client_secret: process.env.LINKEDIN_SECRET, code: code, grant_type: 'authorization_code', redirect_uri: process.env.LINKEDIN_CALLBACK_URL })
            .set('Content-Type', 'application/x-www-form-urlencoded').then(function (result) {

                //console.log("access Token is obtained" + result.body.access_token)
                token = result.body.access_token;
                //console.log("linkenin" + token)
                var header = {

                    'user-agent': 'node.js',
                    'Authorization': "Bearer " + token
                }
                var option = {
                    url: 'https://api.linkedin.com/v2/me',
                    method: 'GET',
                    headers: header,
                }
                reqcall(option, function (error, response, body) {

                    if (!error && response.statusCode == 200) {
                        // Print out the response body
                        body = JSON.parse(body)
                        //res.send(body)
                        if (body) {
                            var headers = {
                                'user-agent': 'node.js',
                                'Authorization': "Bearer " + token
                            }
                            var options = {
                                url: 'https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(primary,type,handle~))',
                                method: 'GET',
                                headers: headers,
                            }
                            reqcall(options, function (error, response, result) {
                                if (!error && response.statusCode == 200) {
                                    result = JSON.parse(result)
                                }
                            })
                        }
                    }
                })
            })
    })
}