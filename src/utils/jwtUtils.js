import axios from "axios";
import { getCookie, setCookie } from "./cookieUtils";

export const API_SERVER_HOST = 'http://localhost:8080';

const jwtAxios = axios.create();

// Access Token 갱신
const refreshJwt = async(accessToken, refreshToken) => {
    const header = {headers: {
        'Authorization': `Bearer ${accessToken}`
    }}
    const res = await axios.get(`${API_SERVER_HOST}/api/refresh?refreshToken=${refreshToken}`, header)
    return res.data;
}

// before request
const beforeReq = (config) => {
    console.log("요청 전 호출 config = ", config);
    const memberInfo = getCookie("member")
    if (!memberInfo) {
        console.log("Member NOT FOUND")
        return Promise.reject({
            response: {
                data: {
                    error: "REQUIRE_LOGIN"
                }
            }
        })
    }
    const {accessToken} = memberInfo;
    config.headers.Authorization = `Bearer ${accessToken}`
    return config;
}

// fail request
const requestFail = (err) => {
    console.log("요청 오류")
    return Promise.reject(err)
}

//---------------------------------------------------------------------

// success response & before return response
const beforeSuccessRes = async (res) => {
    console.log("200 응답 & 응답 전 호출");
    const data = res.data;

    console.log("data = ", data);
    
    // 토큰 만료 응답을 받은 경우
    if(data && data.Token_Expired) {
        console.log("Token is Expired");
        const memberCookieValue = getCookie("member");
        const result = await refreshJwt(memberCookieValue.accessToken, memberCookieValue.refreshToken);

        // 쿠키 값 변경
        memberCookieValue.accessToken = result.accessToken;
        memberCookieValue.refreshToken = result.refreshToken;

        // 쿠키 갱신
        setCookie("member", JSON.stringify(memberCookieValue), 1);

        // 원래 요청에서 헤더에 담긴 access token 을 수정하여 다시 요청을 보낸다
        const originalRequest = res.config;
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`
        return await axios(originalRequest);
    }
    return res;
}

// fail response
const responseFail = (err) => {
    console.log("200 외 응답 & 응답 오류")
    return Promise.reject(err);
}

jwtAxios.interceptors.request.use(beforeReq, requestFail)
jwtAxios.interceptors.response.use(beforeSuccessRes, responseFail)

export default jwtAxios;