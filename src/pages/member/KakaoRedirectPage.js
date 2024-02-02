import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAccessToken, getMemberFromKakao } from '../../api/kakaoApi'
import { useDispatch } from 'react-redux';
import { login } from '../../slices/loginSlice';
import { useLogin } from "../../hooks/useLogin"

function KakaoRedirectPage() {

    const [searchParams] = useSearchParams();
    const authCode = searchParams.get('code');

    const dispatch = useDispatch();
    const {moveToPath} = useLogin();

    useEffect(() => {
        getAccessToken(authCode).then(accessToken => {
            // 전달 받은 access token 을 spring 에 전달
            getMemberFromKakao(accessToken).then(result => {
                console.log("소셜 로그인 결과 = ", result);   
                dispatch(login(result));

                if(result && result.needModifyFlag) {
                    moveToPath("/member/modify");
                } else {
                    moveToPath("/");
                }
            })
        })
    }, [authCode])

    return (
        <div>
            <div>Kakao Login Redirect</div>
            <div>{authCode}</div>
        </div>
    )
}

export default KakaoRedirectPage