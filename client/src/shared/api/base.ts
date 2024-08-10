import axios from 'axios';

axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'http://localhost:5001'; // 백엔드 URL로 변경

export default axios;