(()=>{"use strict";var e={643:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=o(252),r=n(o(653)),c=n(o(903)),d=(0,i.Router)();d.use("/account",r.default),d.use("/vote",c.default),t.default=d},653:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=o(252),r=n(o(992)),c=o(960),d=(0,i.Router)();d.post("/auth",c.tokenAuth),d.post("/signin",c.signin),d.post("/reissue",c.reissueToken),d.use("/google",r.default),t.default=d},903:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0});const n=o(252),i=o(521),r=o(493),c=o(462),d=(0,n.Router)();d.post("/create",i.createVote),d.post("/read-owner",i.readVoteByOwnerId),d.post("/read-participant",i.readVoteParticipants),d.get("/read-sorted-like",i.readVoteSortedLikes),d.get("/read-sorted-participant",i.readVoteSortedParticipants),d.put("/update-like",r.updateLikeInfo),d.post("/read-like",r.readLikeInfo),d.put("/read-choice-count",c.readEachChoiceCount),d.put("/read-mypick",c.readMyPick),d.post("/update-choice",c.updateChoice),t.default=d},859:function(e,t,o){var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(i,r){function c(e){try{s(n.next(e))}catch(e){r(e)}}function d(e){try{s(n.throw(e))}catch(e){r(e)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(c,d)}s((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=i(o(252)),c=i(o(491)),d=i(o(187)),s=o(567);(function(){return n(this,void 0,void 0,(function*(){const e=(0,r.default)(),t=e.listen(c.default.port,(()=>{console.log(`http://localhost:${c.default.port}`)}));return e.get("/",((e,t)=>{t.send("hello")})),yield(0,d.default)({expressApp:e}),t}))})().then((e=>{process.on("SIGINT",(()=>{e.close((()=>{s.client.close(),console.log("closed mongodb")}))}))}))},491:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),n(o(818)).default.config();const i={port:process.env.PORT,mongodb_password:process.env.MONGODB_ADMIN_PASSWORD,access_secret_key:process.env.ACCESS_SECRET_KEY,refresh_secret_key:process.env.REFRESH_SECRET_KEY};t.default=i},44:function(e,t,o){var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(i,r){function c(e){try{s(n.next(e))}catch(e){r(e)}}function d(e){try{s(n.throw(e))}catch(e){r(e)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(c,d)}s((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.mongodbFindOne=t.mongodbFind=void 0;const i=o(567);t.mongodbFind=function(e,t,o,r){return n(this,void 0,void 0,(function*(){try{const n=i.client.db("pengreen").collection(e).find(t,{sort:o,projection:r});return yield n.toArray()}catch(e){throw e}}))},t.mongodbFindOne=function(e,t,o,r){return n(this,void 0,void 0,(function*(){try{const n=i.client.db("pengreen").collection(e);return yield n.findOne(t,{sort:o,projection:r})}catch(e){throw e}}))}},567:(e,t,o)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.mongodbRemove=t.mongodbUpdate=t.mongodbFindOne=t.mongodbFind=t.mongodbInsert=t.client=void 0;var n=o(505);Object.defineProperty(t,"client",{enumerable:!0,get:function(){return n.client}});var i=o(882);Object.defineProperty(t,"mongodbInsert",{enumerable:!0,get:function(){return i.mongodbInsert}});var r=o(44);Object.defineProperty(t,"mongodbFind",{enumerable:!0,get:function(){return r.mongodbFind}}),Object.defineProperty(t,"mongodbFindOne",{enumerable:!0,get:function(){return r.mongodbFindOne}});var c=o(586);Object.defineProperty(t,"mongodbUpdate",{enumerable:!0,get:function(){return c.mongodbUpdate}});var d=o(919);Object.defineProperty(t,"mongodbRemove",{enumerable:!0,get:function(){return d.mongodbRemove}})},505:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.client=void 0;const i=o(518),r=`mongodb+srv://admin:${n(o(491)).default.mongodb_password}@sideproject.ahqpgye.mongodb.net/?retryWrites=true&w=majority&appName=SideProject`;t.client=new i.MongoClient(r)},882:function(e,t,o){var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(i,r){function c(e){try{s(n.next(e))}catch(e){r(e)}}function d(e){try{s(n.throw(e))}catch(e){r(e)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(c,d)}s((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.mongodbInsert=void 0;const i=o(567);t.mongodbInsert=function(e,t){return n(this,void 0,void 0,(function*(){try{const o=i.client.db("pengreen").collection(e);yield o.insertOne(t),console.log(`${e} 컬렉션에 ${t}입력 성공`)}catch(e){console.log(e)}}))}},919:function(e,t,o){var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(i,r){function c(e){try{s(n.next(e))}catch(e){r(e)}}function d(e){try{s(n.throw(e))}catch(e){r(e)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(c,d)}s((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.mongodbRemove=void 0;const i=o(505);t.mongodbRemove=function(e,t){return n(this,void 0,void 0,(function*(){const o=i.client.db("pengreen").collection(e);1===(yield o.deleteMany(t)).deletedCount?console.log("Successfully deleted one document."):console.log("No documents matched the query. Deleted 0 documents.")}))}},586:function(e,t,o){var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(i,r){function c(e){try{s(n.next(e))}catch(e){r(e)}}function d(e){try{s(n.throw(e))}catch(e){r(e)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(c,d)}s((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.mongodbUpdate=void 0;const i=o(567);t.mongodbUpdate=function(e,t,o){return n(this,void 0,void 0,(function*(){const n=i.client.db("pengreen").collection(e),r=yield n.updateOne(t,{$set:o},{upsert:!0});console.log(`${r.matchedCount} document(s) matched the filter, updated ${r.modifiedCount} document(s)`)}))}},587:function(e,t,o){var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(o(252)),r=n(o(577)),c=n(o(643));t.default=e=>{e.use((0,r.default)()),e.use(i.default.json()),e.use("/api",c.default)}},187:function(e,t,o){var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(i,r){function c(e){try{s(n.next(e))}catch(e){r(e)}}function d(e){try{s(n.throw(e))}catch(e){r(e)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(c,d)}s((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const r=i(o(587));t.default=e=>n(void 0,[e],void 0,(function*({expressApp:e}){yield(0,r.default)(e)}))},960:function(e,t,o){var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(i,r){function c(e){try{s(n.next(e))}catch(e){r(e)}}function d(e){try{s(n.throw(e))}catch(e){r(e)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(c,d)}s((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.reissueToken=t.signin=t.tokenAuth=void 0;const r=i(o(829)),c=i(o(491)),d=o(567),s=o(254);t.tokenAuth=(e,t)=>n(void 0,void 0,void 0,(function*(){try{const o=e.headers.authorization;if(!o)return;const n=o.split(" ")[1],i=r.default.verify(n,c.default.access_secret_key),d=(0,s.toUserFormat)(i);t.status(200).send(d)}catch(e){console.log("access Token 만료: ",e.expiredAt),t.send("expired")}})),t.signin=(e,t)=>n(void 0,void 0,void 0,(function*(){try{const o=e.body;(yield a(o))&&(yield u(o));const n={email:o.email},i=yield(0,d.mongodbFindOne)("user",n),r=l(i);t.status(200).send(r)}catch(e){console.log("로그인 에러")}}));const u=e=>n(void 0,void 0,void 0,(function*(){try{const t=(0,s.toUserFormat)(e);yield(0,d.mongodbInsert)("user",t)}catch(e){console.log("회원가입 오류")}})),a=e=>n(void 0,void 0,void 0,(function*(){try{const t={email:e.email};return!(yield(0,d.mongodbFindOne)("user",t))}catch(e){throw e}})),l=e=>{try{const t=(0,s.toUserFormat)(e);return{accessToken:r.default.sign(t,c.default.access_secret_key,{expiresIn:"10s",issuer:"access issuer"}),refreshToken:r.default.sign(t,c.default.refresh_secret_key,{expiresIn:"24h",issuer:"refresh issuer"})}}catch(e){console.error("로그인 오류: ",e)}};t.reissueToken=(e,t)=>{try{const o=e.headers.authorization;if(o){const e=o.split(" ")[1],n=r.default.verify(e,c.default.refresh_secret_key),i=(0,s.toUserFormat)(n);if(n){const e=r.default.sign(i,c.default.access_secret_key,{expiresIn:"10s",issuer:"access issuer"});t.status(200).send(e)}}else t.status(401).send("Access token is missing")}catch(e){t.status(500).json(e)}}},645:function(e,t,o){var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(i,r){function c(e){try{s(n.next(e))}catch(e){r(e)}}function d(e){try{s(n.throw(e))}catch(e){r(e)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(c,d)}s((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.google_redirect=t.google_signout=t.google_signin=void 0;const r=o(154),c=i(o(938)),d=o(156),s=new r.OAuth2Client(d.keys.web.client_id,d.keys.web.client_secret,d.keys.web.redirect_uris[0]);t.google_signin=(e,t)=>{s.generateAuthUrl({access_type:"offline",scope:["https://www.googleapis.com/auth/userinfo.profile","https://www.googleapis.com/auth/userinfo.email"]}),t.status(200).send("hello")},t.google_redirect=(e,t)=>n(void 0,void 0,void 0,(function*(){try{const o=e.body.code,n=yield s.getToken(o);s.setCredentials(n.tokens);const i="https://www.googleapis.com/oauth2/v2/userinfo",r=yield c.default.get(i,{headers:{Authorization:`Bearer ${s.credentials.access_token}`}});t.status(200).send(r.data)}catch(e){console.log(e)}})),t.google_signout=(e,t)=>{try{s.revokeCredentials(((e,t)=>{console.log(e,t)}))}catch(e){console.log("로그아웃 에러")}}},462:function(e,t,o){var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(i,r){function c(e){try{s(n.next(e))}catch(e){r(e)}}function d(e){try{s(n.throw(e))}catch(e){r(e)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(c,d)}s((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.updateChoice=t.readMyPick=t.readEachChoiceCount=void 0;const i=o(567);t.readEachChoiceCount=(e,t)=>n(void 0,void 0,void 0,(function*(){try{const{vote_id:o,choiceList:n}=e.body;let r=[];for(const e of n){const t={vote_id:o,pick:e},n=(yield(0,i.mongodbFind)("vote_participants",t)).length;r.push({content:e,count:n})}t.send(r)}catch(e){throw e}})),t.readMyPick=(e,t)=>n(void 0,void 0,void 0,(function*(){try{const{user_id:o,vote_id:n}=e.body,r={user_id:o,vote_id:n},c=yield(0,i.mongodbFindOne)("vote_participants",r);t.send(null==c?void 0:c.pick)}catch(e){throw e}})),t.updateChoice=(e,t)=>n(void 0,void 0,void 0,(function*(){const o="vote_participants";try{const{user_id:n,vote_id:r,selected:c}=e.body,d={user_id:n,vote_id:r},s=yield(0,i.mongodbFindOne)(o,d);s&&(yield(0,i.mongodbRemove)(o,s));const u={user_id:n,vote_id:r,pick:c};yield(0,i.mongodbInsert)(o,u),t.send()}catch(e){throw e}}))},493:function(e,t,o){var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(i,r){function c(e){try{s(n.next(e))}catch(e){r(e)}}function d(e){try{s(n.throw(e))}catch(e){r(e)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(c,d)}s((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.readLikeInfo=t.updateLikeInfo=void 0;const i=o(44),r=o(567),c=o(304);t.updateLikeInfo=(e,t)=>n(void 0,void 0,void 0,(function*(){try{const{user_id:o,vote_id:n}=e.body,i={user_id:o,vote_id:n};(yield(0,c.duplicateChecker)("vote_likers",i))?yield(0,r.mongodbRemove)("vote_likers",i):yield(0,r.mongodbInsert)("vote_likers",i),t.send()}catch(e){throw e}})),t.readLikeInfo=(e,t)=>n(void 0,void 0,void 0,(function*(){try{const{user_id:o,vote_id:n}=e.body,r={user_id:o,vote_id:n},d=yield(0,c.duplicateChecker)("vote_likers",r),s=(yield(0,i.mongodbFind)("vote_likers",{vote_id:n})).length;t.send({likesCount:s,isLiker:d})}catch(e){throw console.log("좋아요 정보 읽기 오류"),e}}))},521:function(e,t,o){var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(i,r){function c(e){try{s(n.next(e))}catch(e){r(e)}}function d(e){try{s(n.throw(e))}catch(e){r(e)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(c,d)}s((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.deleteVote=t.updateVote=t.readVoteSortedParticipants=t.readVoteSortedLikes=t.readVoteByOwnerId=t.readVoteParticipants=t.createVote=void 0;const i=o(567),r=o(254);t.createVote=(e,t)=>n(void 0,void 0,void 0,(function*(){try{const t=e.body,o=(0,r.toVoteFormat)(t);(0,i.mongodbInsert)("vote",o)}catch(e){throw e}})),t.readVoteParticipants=(e,t)=>n(void 0,void 0,void 0,(function*(){try{const{vote_id:o}=e.body,n={vote_id:o},r=(yield(0,i.mongodbFind)("vote_participants",n)).length;t.send({participantCount:r})}catch(e){throw e}})),t.readVoteByOwnerId=(e,t)=>n(void 0,void 0,void 0,(function*(){try{const{own_id:o}=e.body,n={"owner._id":o},r=yield(0,i.mongodbFind)("vote",n);t.send(r)}catch(e){throw e}})),t.readVoteSortedLikes=(e,t)=>n(void 0,void 0,void 0,(function*(){try{const e={like:-1},o=yield(0,i.mongodbFind)("vote",{},e);t.send(o)}catch(e){throw e}})),t.readVoteSortedParticipants=(e,t)=>n(void 0,void 0,void 0,(function*(){try{const e={participant:-1},o=yield(0,i.mongodbFind)("vote",{},e);t.send(o)}catch(e){throw e}})),t.updateVote=()=>{},t.deleteVote=()=>{}},304:function(e,t,o){var n=this&&this.__awaiter||function(e,t,o,n){return new(o||(o=Promise))((function(i,r){function c(e){try{s(n.next(e))}catch(e){r(e)}}function d(e){try{s(n.throw(e))}catch(e){r(e)}}function s(e){var t;e.done?i(e.value):(t=e.value,t instanceof o?t:new o((function(e){e(t)}))).then(c,d)}s((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.duplicateChecker=void 0;const i=o(567);t.duplicateChecker=(e,t)=>n(void 0,void 0,void 0,(function*(){try{return!!(yield(0,i.mongodbFindOne)(e,t))}catch(e){throw e}}))},254:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.toVoteFormat=t.toUserFormat=void 0,t.toUserFormat=e=>({_id:e._id,email:e.email,name:e.name,picture:e.picture}),t.toVoteFormat=e=>({_id:e._id,owner:(0,t.toUserFormat)(e.owner),title:e.title,max_choice:e.max_choice,start_time:e.start_time,deadline:e.deadline,choice:e.choice})},992:(e,t,o)=>{o.r(t),o.d(t,{default:()=>c});var n=o(252),i=o(645);const r=(0,n.Router)();r.get("/signin",i.google_signin),r.get("/signout",i.google_signout),r.post("/redirect",i.google_redirect);const c=r},156:(e,t,o)=>{o.r(t),o.d(t,{keys:()=>n});const n={web:{client_id:process.env.CLIENT_ID,client_secret:process.env.CLIENT_SECRET,project_id:process.env.PROJECT_ID,auth_uri:"https://accounts.google.com/o/oauth2/auth",token_uri:"https://oauth2.googleapis.com/token",auth_provider_x509_cert_url:"https://www.googleapis.com/oauth2/v1/certs",redirect_uris:["http://localhost:3000/auth/google"],javascript_origins:["http://localhost:5001"]}}},938:e=>{e.exports=require("axios")},577:e=>{e.exports=require("cors")},818:e=>{e.exports=require("dotenv")},252:e=>{e.exports=require("express")},154:e=>{e.exports=require("google-auth-library")},829:e=>{e.exports=require("jsonwebtoken")},518:e=>{e.exports=require("mongodb")}},t={};function o(n){var i=t[n];if(void 0!==i)return i.exports;var r=t[n]={exports:{}};return e[n].call(r.exports,r,r.exports,o),r.exports}o.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return o.d(t,{a:t}),t},o.d=(e,t)=>{for(var n in t)o.o(t,n)&&!o.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},o.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),o.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o(859)})();