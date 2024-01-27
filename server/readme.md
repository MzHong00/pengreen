## API Document

### Google Oauth2
`GET` /api/account/google/signin
return 구글 로그인 폼 url

`GET` /api/account/google/signout


`POST` /api/account/google/redirect
return 구글 로그인 사용자 정보

`POST` /api/account/auth/google
return {accessToken, refreshToken}