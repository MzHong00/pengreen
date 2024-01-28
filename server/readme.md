## API Document

### Google Oauth2
`GET` /api/account/google/signin
return 구글 로그인 폼 url

`GET` /api/account/google/signout


`POST` /api/account/google/redirect
return 구글 로그인 사용자 정보

`POST` /api/account/signin
return { accessToken, refreshToken }

`POST` /api/account/auth
return jwt_payload or expired

`POST` /api/account/reissue
return accessToken