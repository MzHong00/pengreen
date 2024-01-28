## API Document

### google oauth 로그인 창을 가져오기
`GET` /api/account/google/signin
#### `response`
url: String

### google의 계정 정보를 가져오기
`POST` /api/account/google/redirect
#### `request`
`DATA` 
{
    code: String
}
#### `response`
{
  id: String,
  email: String,
  verified_email: boolean,
  name: String,
  given_name: String,
  family_name: String,
  picture: String,
  locale: String
}

### 사용자의 계정 로그인
`POST` /api/account/signin
#### `request`
`DATA`
{
  id: String,
  email: String,
  name: String,
  picture: String,
  locale: String
}
#### `response`
{
  accessToken: String,
  refreshToken: String
}

### 사용자 세션 인증
`POST` /api/account/auth
#### `request`
`HEADERS`
{
    headers: {
        'Authorization': `Bearer ${accessToken}`
    }
}
#### `response`
data: {
  email: String,
  name: String,
  iat: Integer,
  exp: Integer,
  iss: String
}

### 사용자 Access Token 재발급
`POST` /api/account/reissue
#### `request`
`HEADERS`
{
    headers: {
        'Authorization': `Bearer ${refreshToken}`
    }
}
#### `response`
{
  data: String
}