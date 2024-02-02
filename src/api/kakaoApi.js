import axios from "axios";


export const API_SERVER_HOST = 'http://localhost:8080';

// 1. 인가 코드 받기
const rest_api_key = '';
const redirect_uri = 'http://localhost:3000/member/kakao';

const kakao_auth_path = 'https://kauth.kakao.com/oauth/authorize';
const access_token_uri = 'https://kauth.kakao.com/oauth/token';

export const getKaKaoLoginLink = () => {
    const kakaoURL = `${kakao_auth_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
    return kakaoURL;
}


// 2. 인가 코드를 통해 Access Token 발급
export const getAccessToken = async(authCode) => {
    const header = {
        headers: {
            "Content-Type" : "application/x-www-form-urlencoded;charset=utf-8"
        }
    }
    const body = {
        grant_type: 'authorization_code',
        client_id: rest_api_key,
        redirect_uri: redirect_uri,
        code: authCode
    }
    const res = await axios.post(access_token_uri, body, header);
    const accessToken = res.data.access_token;
    return accessToken;
}



export const getMemberFromKakao = async(accessToken) => {
    const res = await axios.get(`${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`);
    return res.data;
}

