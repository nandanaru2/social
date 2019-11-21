var reqcall = require('request')
var request = require('superagent')
const common = require('../models/common')


module.exports = function (app) {


    app.get('/api/git', async function (req, res) {
        var git = await common.social_redirect('Git')
        console.log(git)
        if (git) {
            res.redirect(git)
        }
        else {
            res.status(400).send({
                "message": "Error"
            })
        }
    });

    app.get('/api/auth/github/callback', (req, res) => {
        const code = req.query.code;
        if (!code) {
            return res.status(400).send({
                "message": 'error no code'
            })
        }

        request.post('https://github.com/login/oauth/access_token')
            .send({ client_id: process.env.GITHUB_CLIENTID, client_secret: process.env.GITHUB_SECRET, code: code }) // sends a JSON post body
            .set('Accept', 'application/json').then(function (result) {

                var gittoken = result.body.access_token;
                var headers = {
                    'user-agent': 'node.js',
                    'Authorization': "token " + gittoken
                }
                var options = {
                    url: 'https://api.github.com/user',
                    method: 'GET',
                    headers: headers,
                }
                reqcall(options, async function (error, response, body) {
                    if (error) {
                        res.status(400).send({
                            "message": 'An Error has occured'
                        })
                    }
                    else if (!error && response.statusCode == 200) {
                        body = JSON.parse(body)
                        res.status(200).send({
                            "userDetails": body
                        })
                    }
                    else {
                        res.status(400).send({
                            statusCode: 400,
                            message: 'An Error has occured'
                        })
                    }
                })
            });
    });
}