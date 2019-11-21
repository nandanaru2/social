module.exports = {
    social_redirect: function (social) {
        let redirect = {
            Git: function () {
                return ('http://localhost:5050/api/test')
            },
            Google: function () {
                return ('http://localhost:5050/api/test')
            },
            Linkedin: function () {
                return ('http://localhost:5050/api/test')
            }
        }
        return redirect[social]()
    }

}