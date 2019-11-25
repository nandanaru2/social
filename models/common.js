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
                return (`${process.env.LINKEDIN_URL}?state=true&response_type=code&redirect_uri=${process.env.LINKEDIN_CALLBACK}&scope=${process.env.LINKEDIN_SCOPE}&client_id=${process.env.LINKEDIN_CLIENTID}`)
            }
        }
        return redirect[social]()
    }

}