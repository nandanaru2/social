var reqcall = require('request')
var request = require('superagent')
const common = require('../models/common')


module.exports = function (app) {

 app.get('/api/google', async function (req, res) {
        var google = await common.social_redirect('Google')
        console.log(google)
        if (google) {
            res.redirect(google)
        }
        else {
            res.status(400).send({
                "message": "Error"
            })
        }
    })

    app.get('/auth/google/callback', (req, res) => {

     
        const code  = req.query.code
        console.log("the code is" + code)
        if (!code) {
            //console.log("herer")
            return res.send({
                success: false,
                message: 'error no code'
            })
        }
   
      else {
          console.log("herrere")
        // reqcall.post('https://www.googleapis.com/oauth2/v4/token')
        //     .send({
        //          client_id: process.env.GOOGLE_CLIENTID,
        //           client_secret: process.env.GOOGLE_SECRET,
        //            code: code, 
        //            grant_type:"authorization_code",
        //             redirect_uri: process.env.GOOGLE_CALL_BACK 
        //         })
        //     .then(function (err, result) {
console.log("comes")
console.log("occe"+code)
                //console.log("access Token is obtained" + result.body.access_token)
                var options = { method: 'POST',
                url: 'https://www.googleapis.com/oauth2/v4/token',
                headers: 
                 { 
                   'content-type': 'application/json' },
                body: 
                 {  client_id: process.env.GOOGLE_CLIENTID,
                 client_secret: process.env.GOOGLE_SECRET,
                   code: code,
                   redirect_uri: 'http://localhost:5050/auth/google/callback',
                   grant_type: 'authorization_code' },
                json: true };
              
              reqcall(options, function (error, response, body) {
                if (error) {
                    console.log(error)
                }
              else{
                console.log("body"+JSON.stringify(body));
               
            var token = body.access_token
            console.log("token"+token)
                var options = { method: 'GET',
                url: `https://www.googleapis.com/plus/v1/people/me?key=${process.env.GOOGLE_API_KEY}`,
                
                headers: 
                 {
                   scope: 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile\\"erinfo.email https://www.googleapis.com/auth/userinfo.profile',
                   accept: 'application/json',
                   Authorization: `Bearer ${token}`} };
              console.log(JSON.stringify(options))
              reqcall(options, function (error, response, res) {
                if (error) {
                    console.log("error"+error)
                }
              
                console.log("result"+res);
              });
            }
              });


                // token = result.body.access_token;
                // //console.log("google" + token)
                // var header = {

                //     'user-agent': 'node.js',
                //     'Authorization': "Bearer " + token,
                //     'Accept': "application/json",
                //     'scope': "https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile"
                // }
                // //console.log(header)
                // var option = {
                //     url: `https://www.googleapis.com/plus/v1/people/me?key=${process.env.GOOGLE_API_KEY}`,
                //     method: 'GET',
                //     headers: header,
                // }
                // reqcall(option, async function (error, response, body) {
                //     if (!error && response.statusCode == 200) {
                //         body = JSON.parse(body)
                //         res.status(200).send({
                //             "message": body
                //         })

                //     }
                //     else {
                //         res.status(400).send({
                //             statusCode: 400,
                //             message: 'data not found'
                //         })
                //     }

                // })



            // }, err=>{
            //    console.log("errors"+err) 
            // });
        }

    });


}