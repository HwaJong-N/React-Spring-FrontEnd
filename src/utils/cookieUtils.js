import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (name, value, days = 1) => {
    const expires = new Date();
    expires.setUTCDate(expires.getUTCDate() + days);  // 쿠키를 유지할 날짜를 더해준다

    return cookies.set(name, value, {
        expires: expires,
        path: '/'
    })
}


export const getCookie = (name) => {
    return cookies.get(name);
}


export const removeCookie = (name, path="/") => {
    cookies.remove(name, {path:path});
}