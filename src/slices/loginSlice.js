import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi";
import { getCookie, removeCookie, setCookie } from "../utils/cookieUtils";

const initState = {
    email: ''
}

export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {
    return loginPost(param)
})


const loadMemberCookie = () => {
    return getCookie("member");
}


const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: loadMemberCookie() || initState,    // 초기상태
    reducers: {
        login: (state, action) => {
            console.log("state = ", state);
            console.log("action = ", action);
            return {
                email: action.payload.email
            }
        },
        logout: () => {
            console.log("logout 호출");
            removeCookie("member");
            return { ...initState }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginPostAsync.fulfilled, (state, action) => {
                console.log("fulfilled action = ", action);
                const payload = action.payload;
                // 로그인을 성공한 경우
                if(!payload.error) {
                    setCookie("member", JSON.stringify(payload), 1);
                }

                return payload;
            })
            .addCase(loginPostAsync.pending, (state, action) => {
                console.log("pending action = ", action);
            })
            .addCase(loginPostAsync.rejected, (state, action) => {
                console.log("rejected action = ", action);
            })
    }
})

// 생성된 액션 생성자들을 추출
// login, logout 을 외부에서 호출할 수 있도록 설정
export const { login, logout } = loginSlice.actions;

// 생성된 리듀서를 추출
export default loginSlice.reducer;