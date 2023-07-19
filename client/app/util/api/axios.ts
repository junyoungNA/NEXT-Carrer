import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_SERVER_BASE_URL + '/api',
//   기본 baseURL을 설정합니다.
    withCredentials: true, // withCredentials 옵션을 true로 설정
});

export default instance;