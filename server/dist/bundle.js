/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/api/index.ts":
/*!**************************!*\
  !*** ./src/api/index.ts ***!
  \**************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __webpack_require__(/*! express */ \"express\");\nconst account_1 = __importDefault(__webpack_require__(/*! ./routes/account/account */ \"./src/api/routes/account/account.ts\"));\nconst vote_1 = __importDefault(__webpack_require__(/*! ./routes/vote/vote */ \"./src/api/routes/vote/vote.ts\"));\nconst router = (0, express_1.Router)();\nrouter.use('/account', account_1.default);\nrouter.use('/vote', vote_1.default);\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://server/./src/api/index.ts?");

/***/ }),

/***/ "./src/api/routes/account/account.ts":
/*!*******************************************!*\
  !*** ./src/api/routes/account/account.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __webpack_require__(/*! express */ \"express\");\nconst oauth_google_1 = __importDefault(__webpack_require__(/*! ./googleOauth/oauth_google */ \"./src/api/routes/account/googleOauth/oauth_google.js\"));\nconst auth_1 = __webpack_require__(/*! ../../../services/auth/auth */ \"./src/services/auth/auth.ts\");\nconst router = (0, express_1.Router)();\nrouter.post('/auth', auth_1.tokenAuth);\nrouter.post('/signin', auth_1.signin);\nrouter.post('/reissue', auth_1.reissueToken);\nrouter.use('/google', oauth_google_1.default);\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://server/./src/api/routes/account/account.ts?");

/***/ }),

/***/ "./src/api/routes/vote/vote.ts":
/*!*************************************!*\
  !*** ./src/api/routes/vote/vote.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __webpack_require__(/*! express */ \"express\");\nconst vote_1 = __webpack_require__(/*! ../../../services/vote */ \"./src/services/vote.ts\");\nconst likes_1 = __webpack_require__(/*! ../../../services/likes */ \"./src/services/likes.ts\");\nconst choice_1 = __webpack_require__(/*! ../../../services/choice */ \"./src/services/choice.ts\");\nconst router = (0, express_1.Router)();\nrouter.post('/create', vote_1.createVote);\nrouter.post('/read-owner', vote_1.readVoteByOwnerId);\nrouter.post('/read-participant', vote_1.readVoteParticipants);\nrouter.get('/read-sorted-like', vote_1.readVoteSortedLikes);\nrouter.get('/read-sorted-participant', vote_1.readVoteSortedParticipants);\nrouter.put('/update-like', likes_1.updateLikeInfo);\nrouter.post('/read-like', likes_1.readLikeInfo);\nrouter.put('/read-choice-count', choice_1.readEachChoiceCount);\nrouter.put('/read-mypick', choice_1.readMyPick);\nrouter.post('/update-choice', choice_1.updateChoice);\nexports[\"default\"] = router;\n\n\n//# sourceURL=webpack://server/./src/api/routes/vote/vote.ts?");

/***/ }),

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst index_1 = __importDefault(__webpack_require__(/*! ./config/index */ \"./src/config/index.ts\"));\nconst index_2 = __importDefault(__webpack_require__(/*! ./loaders/index */ \"./src/loaders/index.ts\"));\nconst index_3 = __webpack_require__(/*! ./data-access/mongodb/index */ \"./src/data-access/mongodb/index.ts\");\nfunction startServer() {\n    return __awaiter(this, void 0, void 0, function* () {\n        const app = (0, express_1.default)();\n        const server = app.listen(index_1.default.port, () => {\n            console.log(`http://localhost:${index_1.default.port}`);\n        });\n        console.log(app);\n        app.get('/', (req, res) => {\n            res.send(\"hello\");\n        });\n        yield (0, index_2.default)({\n            expressApp: app\n        });\n        return server;\n    });\n}\nstartServer().then((server) => {\n    process.on('SIGINT', () => {\n        server.close(() => {\n            index_3.client.close();\n            console.log(\"closed mongodb\");\n        });\n    });\n});\n\n\n//# sourceURL=webpack://server/./src/app.ts?");

/***/ }),

/***/ "./src/config/index.ts":
/*!*****************************!*\
  !*** ./src/config/index.ts ***!
  \*****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst dotenv_1 = __importDefault(__webpack_require__(/*! dotenv */ \"dotenv\"));\ndotenv_1.default.config();\nconst config = {\n    port: process.env.PORT,\n    mongodb_password: process.env.MONGODB_ADMIN_PASSWORD,\n    access_secret_key: process.env.ACCESS_SECRET_KEY,\n    refresh_secret_key: process.env.REFRESH_SECRET_KEY\n};\nexports[\"default\"] = config;\n\n\n//# sourceURL=webpack://server/./src/config/index.ts?");

/***/ }),

/***/ "./src/data-access/mongodb/find.ts":
/*!*****************************************!*\
  !*** ./src/data-access/mongodb/find.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.mongodbFindOne = exports.mongodbFind = void 0;\nconst index_1 = __webpack_require__(/*! ./index */ \"./src/data-access/mongodb/index.ts\");\nfunction mongodbFind(col, query, sort, projection) {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            const database = index_1.client.db(\"pengreen\");\n            const selected_collection = database.collection(col);\n            const cursor = selected_collection.find(query, {\n                sort: sort,\n                projection: projection\n            });\n            const data = yield cursor.toArray(); // 커서를 배열로 변환\n            return data;\n        }\n        catch (error) {\n            throw error;\n        }\n    });\n}\nexports.mongodbFind = mongodbFind;\nfunction mongodbFindOne(col, query, sort, projection) {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            const database = index_1.client.db(\"pengreen\");\n            const selected_collection = database.collection(col);\n            const data = yield selected_collection.findOne(query, {\n                sort: sort,\n                projection: projection,\n            });\n            return data;\n        }\n        catch (error) {\n            throw error;\n        }\n    });\n}\nexports.mongodbFindOne = mongodbFindOne;\n\n\n//# sourceURL=webpack://server/./src/data-access/mongodb/find.ts?");

/***/ }),

/***/ "./src/data-access/mongodb/index.ts":
/*!******************************************!*\
  !*** ./src/data-access/mongodb/index.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.mongodbRemove = exports.mongodbUpdate = exports.mongodbFindOne = exports.mongodbFind = exports.mongodbInsert = exports.client = void 0;\nvar init_1 = __webpack_require__(/*! ./init */ \"./src/data-access/mongodb/init.ts\");\nObject.defineProperty(exports, \"client\", ({ enumerable: true, get: function () { return init_1.client; } }));\nvar insert_1 = __webpack_require__(/*! ./insert */ \"./src/data-access/mongodb/insert.ts\");\nObject.defineProperty(exports, \"mongodbInsert\", ({ enumerable: true, get: function () { return insert_1.mongodbInsert; } }));\nvar find_1 = __webpack_require__(/*! ./find */ \"./src/data-access/mongodb/find.ts\");\nObject.defineProperty(exports, \"mongodbFind\", ({ enumerable: true, get: function () { return find_1.mongodbFind; } }));\nObject.defineProperty(exports, \"mongodbFindOne\", ({ enumerable: true, get: function () { return find_1.mongodbFindOne; } }));\nvar update_1 = __webpack_require__(/*! ./update */ \"./src/data-access/mongodb/update.ts\");\nObject.defineProperty(exports, \"mongodbUpdate\", ({ enumerable: true, get: function () { return update_1.mongodbUpdate; } }));\nvar remove_1 = __webpack_require__(/*! ./remove */ \"./src/data-access/mongodb/remove.ts\");\nObject.defineProperty(exports, \"mongodbRemove\", ({ enumerable: true, get: function () { return remove_1.mongodbRemove; } }));\n\n\n//# sourceURL=webpack://server/./src/data-access/mongodb/index.ts?");

/***/ }),

/***/ "./src/data-access/mongodb/init.ts":
/*!*****************************************!*\
  !*** ./src/data-access/mongodb/init.ts ***!
  \*****************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.client = void 0;\nconst mongodb_1 = __webpack_require__(/*! mongodb */ \"mongodb\");\nconst config_1 = __importDefault(__webpack_require__(/*! ../../config */ \"./src/config/index.ts\"));\nconst uri = `mongodb+srv://admin:${config_1.default.mongodb_password}@sideproject.ahqpgye.mongodb.net/?retryWrites=true&w=majority&appName=SideProject`;\nexports.client = new mongodb_1.MongoClient(uri);\n\n\n//# sourceURL=webpack://server/./src/data-access/mongodb/init.ts?");

/***/ }),

/***/ "./src/data-access/mongodb/insert.ts":
/*!*******************************************!*\
  !*** ./src/data-access/mongodb/insert.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.mongodbInsert = void 0;\nconst index_1 = __webpack_require__(/*! ./index */ \"./src/data-access/mongodb/index.ts\");\nfunction mongodbInsert(col, data) {\n    return __awaiter(this, void 0, void 0, function* () {\n        try {\n            const database = index_1.client.db(\"pengreen\");\n            const collection_data = database.collection(col);\n            const result = yield collection_data.insertOne(data);\n            console.log(`${col} 컬렉션에 ${data}입력 성공`);\n        }\n        catch (error) {\n            console.log(error);\n        }\n    });\n}\nexports.mongodbInsert = mongodbInsert;\n\n\n//# sourceURL=webpack://server/./src/data-access/mongodb/insert.ts?");

/***/ }),

/***/ "./src/data-access/mongodb/remove.ts":
/*!*******************************************!*\
  !*** ./src/data-access/mongodb/remove.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.mongodbRemove = void 0;\nconst init_1 = __webpack_require__(/*! ./init */ \"./src/data-access/mongodb/init.ts\");\nfunction mongodbRemove(col, query) {\n    return __awaiter(this, void 0, void 0, function* () {\n        const database = init_1.client.db(\"pengreen\");\n        const movies = database.collection(col);\n        const result = yield movies.deleteMany(query);\n        if (result.deletedCount === 1) {\n            console.log(\"Successfully deleted one document.\");\n        }\n        else {\n            console.log(\"No documents matched the query. Deleted 0 documents.\");\n        }\n    });\n}\nexports.mongodbRemove = mongodbRemove;\n\n\n//# sourceURL=webpack://server/./src/data-access/mongodb/remove.ts?");

/***/ }),

/***/ "./src/data-access/mongodb/update.ts":
/*!*******************************************!*\
  !*** ./src/data-access/mongodb/update.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.mongodbUpdate = void 0;\nconst index_1 = __webpack_require__(/*! ./index */ \"./src/data-access/mongodb/index.ts\");\nfunction mongodbUpdate(col, query, data) {\n    return __awaiter(this, void 0, void 0, function* () {\n        const database = index_1.client.db(\"pengreen\");\n        const movies = database.collection(col);\n        const result = yield movies.updateOne(query, {\n            $set: data,\n        }, \n        /* Set the upsert option to insert a document if no documents\n        match the filter */\n        { upsert: true });\n        // Print the number of matching and modified documents\n        console.log(`${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`);\n    });\n}\nexports.mongodbUpdate = mongodbUpdate;\n\n\n//# sourceURL=webpack://server/./src/data-access/mongodb/update.ts?");

/***/ }),

/***/ "./src/loaders/express.ts":
/*!********************************!*\
  !*** ./src/loaders/express.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst cors_1 = __importDefault(__webpack_require__(/*! cors */ \"cors\"));\nconst index_1 = __importDefault(__webpack_require__(/*! ../api/index */ \"./src/api/index.ts\"));\nexports[\"default\"] = (app) => {\n    app.use((0, cors_1.default)());\n    app.use(express_1.default.json());\n    app.use('/api', index_1.default);\n};\n\n\n//# sourceURL=webpack://server/./src/loaders/express.ts?");

/***/ }),

/***/ "./src/loaders/index.ts":
/*!******************************!*\
  !*** ./src/loaders/index.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! ./express */ \"./src/loaders/express.ts\"));\nexports[\"default\"] = (_a) => __awaiter(void 0, [_a], void 0, function* ({ expressApp }) {\n    yield (0, express_1.default)(expressApp);\n});\n\n\n//# sourceURL=webpack://server/./src/loaders/index.ts?");

/***/ }),

/***/ "./src/services/auth/auth.ts":
/*!***********************************!*\
  !*** ./src/services/auth/auth.ts ***!
  \***********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.reissueToken = exports.signin = exports.tokenAuth = void 0;\nconst jsonwebtoken_1 = __importDefault(__webpack_require__(/*! jsonwebtoken */ \"jsonwebtoken\"));\nconst config_1 = __importDefault(__webpack_require__(/*! ../../config */ \"./src/config/index.ts\"));\nconst mongodb_1 = __webpack_require__(/*! ../../data-access/mongodb */ \"./src/data-access/mongodb/index.ts\");\nconst formatUtils_1 = __webpack_require__(/*! ../../utils/formatUtils */ \"./src/utils/formatUtils.ts\");\nconst ACCESS_TOKEN_EXPIRES = \"10s\";\nconst tokenAuth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const authorizationHeader = req.headers['authorization'];\n        if (!authorizationHeader) {\n            return;\n        }\n        // \"Bearer <token>\" 형식으로 전송된 토큰에서 \"Bearer \" 부분을 제거하여 토큰을 추출합니다.\n        const accessToken = authorizationHeader.split(' ')[1];\n        const data = jsonwebtoken_1.default.verify(accessToken, config_1.default.access_secret_key);\n        const user = (0, formatUtils_1.toUserFormat)(data);\n        res.status(200).send(user);\n    }\n    catch (error) {\n        console.log(\"access Token 만료: \", error.expiredAt);\n        res.send('expired');\n    }\n});\nexports.tokenAuth = tokenAuth;\nconst signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const accountOfGoogle = req.body;\n        const isGuest = yield isUserExist(accountOfGoogle);\n        if (isGuest) {\n            yield signup(accountOfGoogle);\n        }\n        const userFindQuery = {\n            email: accountOfGoogle.email\n        };\n        const user = yield (0, mongodb_1.mongodbFindOne)('user', userFindQuery);\n        const token = issueToken(user);\n        res.status(200).send(token);\n    }\n    catch (error) {\n        console.log(\"로그인 에러\");\n    }\n});\nexports.signin = signin;\n//회원가입하여 사용자 DB에 추가\nconst signup = (user) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const data = (0, formatUtils_1.toUserFormat)(user);\n        yield (0, mongodb_1.mongodbInsert)('user', data);\n    }\n    catch (error) {\n        console.log(\"회원가입 오류\");\n    }\n});\n//boolean, 사용자 DB에 사용자가 존재하는지 여부\nconst isUserExist = (user) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const query = {\n            email: user.email\n        };\n        const data = yield (0, mongodb_1.mongodbFindOne)('user', query);\n        const isGuest = data ? false : true;\n        return isGuest;\n    }\n    catch (error) {\n        throw error;\n    }\n});\n//로그인하여 token을 발급\nconst issueToken = (user) => {\n    try {\n        const payload = (0, formatUtils_1.toUserFormat)(user);\n        const accessToken = jsonwebtoken_1.default.sign(payload, config_1.default.access_secret_key, {\n            expiresIn: ACCESS_TOKEN_EXPIRES,\n            issuer: 'access issuer'\n        });\n        const refreshToken = jsonwebtoken_1.default.sign(payload, config_1.default.refresh_secret_key, {\n            expiresIn: '24h',\n            issuer: 'refresh issuer'\n        });\n        return {\n            accessToken, refreshToken\n        };\n    }\n    catch (error) {\n        console.error(\"로그인 오류: \", error);\n    }\n};\nconst reissueToken = (req, res) => {\n    try {\n        const authorizationHeader = req.headers['authorization'];\n        if (authorizationHeader) {\n            // \"Bearer <token>\" 형식으로 전송된 토큰에서 \"Bearer \" 부분을 제거하여 토큰을 추출합니다.\n            const refreshToken = authorizationHeader.split(' ')[1];\n            const data = jsonwebtoken_1.default.verify(refreshToken, config_1.default.refresh_secret_key);\n            const payload = (0, formatUtils_1.toUserFormat)(data);\n            if (data) {\n                const accessToken = jsonwebtoken_1.default.sign(payload, config_1.default.access_secret_key, {\n                    expiresIn: ACCESS_TOKEN_EXPIRES,\n                    issuer: 'access issuer'\n                });\n                res.status(200).send(accessToken);\n            }\n        }\n        else {\n            res.status(401).send('Access token is missing');\n        }\n    }\n    catch (error) {\n        res.status(500).json(error);\n    }\n};\nexports.reissueToken = reissueToken;\n\n\n//# sourceURL=webpack://server/./src/services/auth/auth.ts?");

/***/ }),

/***/ "./src/services/auth/google_oauth.ts":
/*!*******************************************!*\
  !*** ./src/services/auth/google_oauth.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.google_redirect = exports.google_signout = exports.google_signin = void 0;\nconst google_auth_library_1 = __webpack_require__(/*! google-auth-library */ \"google-auth-library\");\nconst axios_1 = __importDefault(__webpack_require__(/*! axios */ \"axios\"));\nconst oauth2_keys_1 = __webpack_require__(/*! ../../config/oauth2.keys */ \"./src/config/oauth2.keys.js\");\nconst oAuth2Client = new google_auth_library_1.OAuth2Client(oauth2_keys_1.keys.web.client_id, oauth2_keys_1.keys.web.client_secret, oauth2_keys_1.keys.web.redirect_uris[0]);\nconst google_signin = (req, res) => {\n    const authorizeUrl = oAuth2Client.generateAuthUrl({\n        access_type: 'offline',\n        scope: [\n            'https://www.googleapis.com/auth/userinfo.profile',\n            'https://www.googleapis.com/auth/userinfo.email'\n        ]\n    });\n    res.status(200).send(\"hello\");\n};\nexports.google_signin = google_signin;\nconst google_redirect = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const code = req.body.code;\n        const r = yield oAuth2Client.getToken(code);\n        oAuth2Client.setCredentials(r.tokens);\n        const googleApi = 'https://www.googleapis.com/oauth2/v2/userinfo';\n        const redirect = yield axios_1.default.get(googleApi, {\n            headers: {\n                Authorization: `Bearer ${oAuth2Client.credentials.access_token}`,\n            }\n        });\n        res.status(200).send(redirect.data);\n    }\n    catch (error) {\n        console.log(error);\n    }\n});\nexports.google_redirect = google_redirect;\nconst google_signout = (req, res) => {\n    try {\n        oAuth2Client.revokeCredentials((err, body) => {\n            console.log(err, body);\n        });\n    }\n    catch (error) {\n        console.log(\"로그아웃 에러\");\n    }\n};\nexports.google_signout = google_signout;\n\n\n//# sourceURL=webpack://server/./src/services/auth/google_oauth.ts?");

/***/ }),

/***/ "./src/services/choice.ts":
/*!********************************!*\
  !*** ./src/services/choice.ts ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.updateChoice = exports.readMyPick = exports.readEachChoiceCount = void 0;\nconst mongodb_1 = __webpack_require__(/*! ../data-access/mongodb */ \"./src/data-access/mongodb/index.ts\");\n//투표 선택 수\nconst readEachChoiceCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const collection = 'vote_participants';\n    try {\n        const { vote_id, choiceList } = req.body;\n        //각각의 투표 선택 항목의 수\n        let totalChoiceCount = [];\n        for (const choice of choiceList) {\n            const eachChoiceQuery = {\n                vote_id: vote_id,\n                pick: choice\n            };\n            const eachChoice = yield (0, mongodb_1.mongodbFind)(collection, eachChoiceQuery);\n            const eachChoiceCount = eachChoice.length;\n            totalChoiceCount.push({\n                content: choice,\n                count: eachChoiceCount\n            });\n        }\n        res.send(totalChoiceCount);\n    }\n    catch (error) {\n        throw error;\n    }\n});\nexports.readEachChoiceCount = readEachChoiceCount;\n//내가 투표자인지\nconst readMyPick = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const collection = 'vote_participants';\n    try {\n        const { user_id, vote_id } = req.body;\n        //내가 투표자인지\n        const myPickQuery = {\n            user_id: user_id,\n            vote_id: vote_id\n        };\n        const myPick = yield (0, mongodb_1.mongodbFindOne)(collection, myPickQuery);\n        res.send(myPick === null || myPick === void 0 ? void 0 : myPick.pick);\n    }\n    catch (error) {\n        throw error;\n    }\n});\nexports.readMyPick = readMyPick;\nconst updateChoice = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const collection = 'vote_participants';\n    try {\n        const { user_id, vote_id, selected } = req.body;\n        const participantQuery = {\n            user_id: user_id,\n            vote_id: vote_id,\n        };\n        const prevPick = yield (0, mongodb_1.mongodbFindOne)(collection, participantQuery);\n        if (prevPick) {\n            yield (0, mongodb_1.mongodbRemove)(collection, prevPick);\n        }\n        const newPickQuery = {\n            user_id: user_id,\n            vote_id: vote_id,\n            pick: selected\n        };\n        yield (0, mongodb_1.mongodbInsert)(collection, newPickQuery);\n        res.send();\n    }\n    catch (error) {\n        throw error;\n    }\n});\nexports.updateChoice = updateChoice;\n// //투표 항목 가져오기\n// export const getChoiceOfVote = async (req, res) => {\n//     try {\n//         const { vote_id } = req.body;\n//         const choiceOfVote_query = `selected choice.id, content, count from choice join vote on choice.vote_id = vote.id where vote_id = '${vote_id}'`;\n//         const choiceOfVote = await mysql(choiceOfVote_query);\n//         res.send(choiceOfVote);\n//     } catch (error) {\n//         console.log(error);\n//     }\n// }\n// //사용자가 고른 투표 항목 적용 후 고른 항목 가져오기\n// export const updateChoiceCount = async (req, res) => {\n//     try {\n//         const { user_id, vote_id, pick } = req.body;\n//         //특정 사용자가 특정 투표를 참여했는지 확인하는 쿼리\n//         const participant_query = `selected id from participant_vote where user_id = '${user_id}' and vote_id = '${vote_id}'`;\n//         const participate_vote = await mysql(participant_query);\n//         let isParticipant = participate_vote.length !== 0;\n//         if (isParticipant) {\n//             //사용자가 기존에 고른 픽들을 1씩 감소\n//             const countDown_query = `update choice_count set count = count - 1 where user_id = '${user_id}' and vote_id = '${vote_id}'`;\n//             await mysql(countDown_query);\n//             //사용자가 참여한 투표 테이블 삭제\n//             const deletePick_query = `delete from participant_vote where user_id = '${user_id}' and vote_id = '${vote_id}'`;\n//             await mysql(deletePick_query);\n//         }\n//         for (const value of pick) {\n//             const setPick_query = `insert into participant_vote(user_id, vote_id, content) values ('${user_id}', '${vote_id}', '${value}')`;\n//             await mysql(setPick_query);\n//         }\n//         //사용자가 고른 Pick 1증가\n//         const applyPick_query = `update choice_count set count = count + 1 where user_id = '${user_id}' and vote_id = '${vote_id}'`;\n//         await mysql(applyPick_query);\n//         const returnChoice_query = `selected * from choice where vote_id = '${vote_id}'`;\n//         const returnChoice = await mysql(returnChoice_query);\n//         res.send(returnChoice)\n//     } catch (error) {\n//         console.log(\"투표 선택 에러\");\n//     }\n// }\n// //사용자가 투표한 목록 가져오기\n// export const getPick = async (req, res) => {\n//     try {\n//         const { user_id, vote_id } = req.body;\n//         //특정 사용자가 특정 투표를 참여했는지 확인하는 쿼리\n//         const participant_query = `selected * from participant_vote where user_id = '${user_id}' and vote_id = '${vote_id}'`;\n//         const participate_vote = await mysql(participant_query);\n//         res.send(participate_vote);\n//     } catch (error) {\n//         console.log(\"사용자가 투표 여부 확인 처리 에러\");\n//     }\n// }\n\n\n//# sourceURL=webpack://server/./src/services/choice.ts?");

/***/ }),

/***/ "./src/services/likes.ts":
/*!*******************************!*\
  !*** ./src/services/likes.ts ***!
  \*******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.readLikeInfo = exports.updateLikeInfo = void 0;\nconst find_1 = __webpack_require__(/*! ../data-access/mongodb/find */ \"./src/data-access/mongodb/find.ts\");\nconst mongodb_1 = __webpack_require__(/*! ../data-access/mongodb */ \"./src/data-access/mongodb/index.ts\");\nconst duplicateChecker_1 = __webpack_require__(/*! ../utils/duplicateChecker */ \"./src/utils/duplicateChecker.ts\");\n//좋아요 버튼 Count DB에 반영\nconst updateLikeInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const { user_id, vote_id } = req.body;\n        // 사용자가 좋아요를 누른 사람인지 확인\n        const likerQuery = {\n            user_id: user_id,\n            vote_id: vote_id\n        };\n        const isLiker = yield (0, duplicateChecker_1.duplicateChecker)('vote_likers', likerQuery);\n        isLiker ? yield (0, mongodb_1.mongodbRemove)('vote_likers', likerQuery) : yield (0, mongodb_1.mongodbInsert)('vote_likers', likerQuery);\n        res.send();\n    }\n    catch (error) {\n        throw error;\n    }\n});\nexports.updateLikeInfo = updateLikeInfo;\nconst readLikeInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const { user_id, vote_id } = req.body;\n        // 사용자가 좋아요를 누른 사람인지 확인\n        const likerCheckQuery = {\n            user_id: user_id,\n            vote_id: vote_id\n        };\n        const isLiker = yield (0, duplicateChecker_1.duplicateChecker)('vote_likers', likerCheckQuery);\n        // 좋아요의 개수\n        const likes = yield (0, find_1.mongodbFind)('vote_likers', {\n            vote_id: vote_id\n        });\n        const likesCount = likes.length;\n        res.send({\n            likesCount: likesCount,\n            isLiker: isLiker\n        });\n    }\n    catch (error) {\n        console.log(\"좋아요 정보 읽기 오류\");\n        throw error;\n    }\n});\nexports.readLikeInfo = readLikeInfo;\n\n\n//# sourceURL=webpack://server/./src/services/likes.ts?");

/***/ }),

/***/ "./src/services/vote.ts":
/*!******************************!*\
  !*** ./src/services/vote.ts ***!
  \******************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.deleteVote = exports.updateVote = exports.readVoteSortedParticipants = exports.readVoteSortedLikes = exports.readVoteByOwnerId = exports.readVoteParticipants = exports.createVote = void 0;\nconst mongodb_1 = __webpack_require__(/*! ../data-access/mongodb */ \"./src/data-access/mongodb/index.ts\");\nconst formatUtils_1 = __webpack_require__(/*! ../utils/formatUtils */ \"./src/utils/formatUtils.ts\");\nconst createVote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const data = req.body;\n        const vote = (0, formatUtils_1.toVoteFormat)(data);\n        (0, mongodb_1.mongodbInsert)('vote', vote);\n    }\n    catch (error) {\n        throw error;\n    }\n});\nexports.createVote = createVote;\nconst readVoteParticipants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    const collection = \"vote_participants\";\n    try {\n        const { vote_id } = req.body;\n        //투표 참여자 수\n        const choiceListQuery = {\n            vote_id: vote_id\n        };\n        const participant = yield (0, mongodb_1.mongodbFind)(collection, choiceListQuery);\n        const participantCount = participant.length;\n        res.send({\n            participantCount: participantCount,\n        });\n    }\n    catch (error) {\n        throw error;\n    }\n});\nexports.readVoteParticipants = readVoteParticipants;\nconst readVoteByOwnerId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const { own_id } = req.body;\n        const query = {\n            \"owner._id\": own_id\n        };\n        const votes = yield (0, mongodb_1.mongodbFind)('vote', query);\n        res.send(votes);\n    }\n    catch (error) {\n        throw error;\n    }\n});\nexports.readVoteByOwnerId = readVoteByOwnerId;\nconst readVoteSortedLikes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const sort = {\n            like: -1\n        };\n        const votes = yield (0, mongodb_1.mongodbFind)('vote', {}, sort);\n        res.send(votes);\n    }\n    catch (error) {\n        throw error;\n    }\n});\nexports.readVoteSortedLikes = readVoteSortedLikes;\nconst readVoteSortedParticipants = (req, res) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const sort = {\n            participant: -1\n        };\n        const votes = yield (0, mongodb_1.mongodbFind)('vote', {}, sort);\n        res.send(votes);\n    }\n    catch (error) {\n        throw error;\n    }\n});\nexports.readVoteSortedParticipants = readVoteSortedParticipants;\nconst updateVote = () => {\n};\nexports.updateVote = updateVote;\nconst deleteVote = () => {\n};\nexports.deleteVote = deleteVote;\n\n\n//# sourceURL=webpack://server/./src/services/vote.ts?");

/***/ }),

/***/ "./src/utils/duplicateChecker.ts":
/*!***************************************!*\
  !*** ./src/utils/duplicateChecker.ts ***!
  \***************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.duplicateChecker = void 0;\nconst mongodb_1 = __webpack_require__(/*! ../data-access/mongodb */ \"./src/data-access/mongodb/index.ts\");\nconst duplicateChecker = (collection, checkQuery) => __awaiter(void 0, void 0, void 0, function* () {\n    try {\n        const duplication = yield (0, mongodb_1.mongodbFindOne)(collection, checkQuery);\n        const isDuplication = !!duplication;\n        return isDuplication;\n    }\n    catch (error) {\n        throw error;\n    }\n});\nexports.duplicateChecker = duplicateChecker;\n\n\n//# sourceURL=webpack://server/./src/utils/duplicateChecker.ts?");

/***/ }),

/***/ "./src/utils/formatUtils.ts":
/*!**********************************!*\
  !*** ./src/utils/formatUtils.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.toVoteFormat = exports.toUserFormat = void 0;\nconst toUserFormat = (userData) => {\n    return {\n        _id: userData._id,\n        email: userData.email,\n        name: userData.name,\n        picture: userData.picture\n    };\n};\nexports.toUserFormat = toUserFormat;\nconst toVoteFormat = (data) => {\n    return {\n        _id: data._id,\n        owner: (0, exports.toUserFormat)(data.owner),\n        title: data.title,\n        max_choice: data.max_choice,\n        start_time: data.start_time,\n        deadline: data.deadline,\n        choice: data.choice\n    };\n};\nexports.toVoteFormat = toVoteFormat;\n\n\n//# sourceURL=webpack://server/./src/utils/formatUtils.ts?");

/***/ }),

/***/ "./src/api/routes/account/googleOauth/oauth_google.js":
/*!************************************************************!*\
  !*** ./src/api/routes/account/googleOauth/oauth_google.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! express */ \"express\");\n/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _services_auth_google_oauth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../services/auth/google_oauth */ \"./src/services/auth/google_oauth.ts\");\n/* harmony import */ var _services_auth_google_oauth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_services_auth_google_oauth__WEBPACK_IMPORTED_MODULE_1__);\n\r\n\r\n\r\n\r\nconst router = (0,express__WEBPACK_IMPORTED_MODULE_0__.Router)();\r\n\r\nrouter.get('/signin', _services_auth_google_oauth__WEBPACK_IMPORTED_MODULE_1__.google_signin);\r\nrouter.get('/signout', _services_auth_google_oauth__WEBPACK_IMPORTED_MODULE_1__.google_signout);\r\nrouter.post('/redirect', _services_auth_google_oauth__WEBPACK_IMPORTED_MODULE_1__.google_redirect)\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (router);\n\n//# sourceURL=webpack://server/./src/api/routes/account/googleOauth/oauth_google.js?");

/***/ }),

/***/ "./src/config/oauth2.keys.js":
/*!***********************************!*\
  !*** ./src/config/oauth2.keys.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   keys: () => (/* binding */ keys)\n/* harmony export */ });\nconst keys = {\r\n    web: {\r\n        client_id: process.env.CLIENT_ID,\r\n        client_secret: process.env.CLIENT_SECRET,\r\n        project_id: process.env.PROJECT_ID,\r\n        \"auth_uri\": \"https://accounts.google.com/o/oauth2/auth\",\r\n        \"token_uri\": \"https://oauth2.googleapis.com/token\",\r\n        \"auth_provider_x509_cert_url\": \"https://www.googleapis.com/oauth2/v1/certs\",\r\n        \"redirect_uris\": [\r\n            \"http://localhost:3000/auth/google\"\r\n        ],\r\n        \"javascript_origins\": [\r\n            \"http://localhost:5001\"\r\n        ]\r\n    }\r\n}\n\n//# sourceURL=webpack://server/./src/config/oauth2.keys.js?");

/***/ }),

/***/ "axios":
/*!************************!*\
  !*** external "axios" ***!
  \************************/
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("cors");

/***/ }),

/***/ "dotenv":
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("dotenv");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "google-auth-library":
/*!**************************************!*\
  !*** external "google-auth-library" ***!
  \**************************************/
/***/ ((module) => {

module.exports = require("google-auth-library");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("mongodb");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;