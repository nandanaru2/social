# social media login for git and linkedin using nodejs without passportjs package 


.env file is needed just create an client id and client secret from git and linked in 

Import your client id and secret for git and linked in

GITHUB_URL=https://github.com/login/oauth/authorize
GOOGLE_URL=https://accounts.google.com/o/oauth2/auth
LINKEDIN_URL=https://linkedin.com/oauth/v2/authorization
GITHUB_CALLBACK_URL=http://localhost:5050/api/auth/github/callback



GITHUB_CLIENTID=
GITHUB_SECRET=
GOOGLE_STATE= %2Fprofile
GOOGLE_RESPONSE_TYPE=code
GOOGLE_SCOPE = https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/plus.me https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile
GOOGLE_CALL_BACK =	http%3A%2F%2Flocalhost%3A5050%2Fauth%2Fgoogle%2Fcallback
GOOGLE_CLIENTID = 
GOOGLE_APPROVAL_PROMPT = force
GOOGLE_SECRET= 
GOOGLE_REDIRECTION_URL= http%3A%2F%2Flocalhost%3A5050%2Fauth%2Fgoogle%2Fcallback
GOOGLE_APPROVAL= !ChRZaG5hdDdLU1hGV3ZTZU5Rc3JCaRIfb3p3THRQOXd4cFlUOEhuU1JuY2dubXBlUzBVSnpoWQ%E2%88%99AJDr988AAAAAXWnqKZT2-Xqtub615QOKEesdCYyJHqgF
GOOGLE_OAUTHGDPR=1&xsrfsig=ChkAeAh8T0Ntnszwqu5h5KqtXxzN9zroQl31Eg5hcHByb3ZhbF9zdGF0ZRILZGVzdGluYXRpb24SBXNvYWN1Eg9vYXV0aHJpc2t5c2NvcGU
GOOGLE_FLOWNAME=GeneralOAuthFlow
LINKEDIN_CLIENTID=
LINKEDIN_SECRET=
LINKEDIN_CALLBACK=http%3A%2F%2Flocalhost%3A5050%2Fauth%2Flinkedin%2Fcallback
LINKEDIN_SCOPE=r_liteprofile r_emailaddress
LINKEDIN_CALLBACK_URL=http://localhost:5050/auth/linkedin/callback
LINKEDIN_EMAIL_HANDEL=.handle~
GOOGLE_API_KEY= AIzaSyCFRyUdLtvCo8NGJ6-dF27UcrcUeh9Q4g4
