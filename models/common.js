module.exports = {
    social_redirect: function (social) {
        let redirect = {
            Git: function () {
                return (`${process.env.GITHUB_URL}?client_id=${process.env.GITHUB_CLIENTID}`)
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