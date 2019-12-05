module.exports = {
    social_redirect: function (social) {
        let redirect = {
            Git: function () {
                return (`${process.env.GITHUB_URL}?client_id=${process.env.GITHUB_CLIENTID}`)
            },
            Google: function () {
                return (`${process.env.GOOGLE_URL}?scope=${process.env.GOOGLE_SCOPE}&state=${process.env.GOOGLE_STATE}&redirect_uri=${process.env.GOOGLE_REDIRECTION_URL}&response_type=${process.env.GOOGLE_RESPONSE_TYPE}&client_id=${process.env.GOOGLE_CLIENTID}&approval_prompt=${process.env.GOOGLE_APPROVAL_PROMPT}`)
            },
            Linkedin: function () {
                return (`${process.env.LINKEDIN_URL}?state=true&response_type=code&redirect_uri=${process.env.LINKEDIN_CALLBACK}&scope=${process.env.LINKEDIN_SCOPE}&client_id=${process.env.LINKEDIN_CLIENTID}`)
            }
        }
        return redirect[social]()
    }

}