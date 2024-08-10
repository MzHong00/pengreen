## 사용 기술
### Client
01. React
02. Tailwind
03. chart.js

`기록할 것들`
- react-icons
- react-cookie
- tailwindcss(PostCss)
- http-proxy-middleware
- chart.js
- js 유사 객체 (form.child를 배열로)
- css attr() 가상 요소 선택자에 동적 데이터 전송
- js scroll 함수

### Server
01. Nodejs
02. mysql
03. google-oauth
04. jwt

`기록할 것들`
- google-oauth-library
- dotenv
- cors

#### hard point
01. 투표 데이터 결정 (like와 choice를 vote에 붙힐지 말지)
02. 프로젝트 아키텍처 (프로젝트를 까먹으면 컴포넌트들을 일일히 다 찾아다녀야 하는 문제)

구글로 로그인 하기 흐름도
01. 클라이언트의 구글로 로그인하기 요청
02. 서버에서 구글 로그인 폼 url 응답
03. 클라이언트는 로그인 성공
04. 구글 서버는 개발자가 지정한 url로 redirect
05. 클라이언트는 redirect된 url로 이동 code라는 키 값의 쿼리 스트링도 받게 됨
06. redirect된 url에 code라는 키의 쿼리 스트링를 갖고 서버에 요청
07. 서버는 google api를 통해 code를 사용하여 구글 계정 정보를 가져옴

08. 서버는 구글 계정 정보를 통해 DB에 계정이 있는지 확인 후, 회원가입 or 로그인을 결정
09. 회원가입 및 로그인 후, accessToken/refreshToken을 발급하여 클라이언트에 쿠키의 형태로 전송
10. 클라이언트는 응답받은 쿠키를 통해 페이지를 이동할 때마다 인증

※ accessToken이 만료될 시, 재발급
※ refreshToken이 만료될 시, 로그인 해제