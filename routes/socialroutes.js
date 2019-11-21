const express = require('express')
const router = express.Router();
var reqcall = require('request')

router.get('/git', function (req, res) {
    res.status(200).send({
        "message":"working"
    })
})




module.exports = router