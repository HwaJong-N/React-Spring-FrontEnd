import React from 'react'
import { Link } from 'react-router-dom';
import { getKaKaoLoginLink } from '../../api/kakaoApi'


const link = getKaKaoLoginLink();

// 카카오 로그인 링크가 걸린 버튼
function KakaoLoginComponent() {
    return (
        <div className="flex flex-col">
            <div className="text-center text-xl font-bold text-black">간편 로그인</div>
            <div className="flex justify-center w-full">
                <div
                    className="text-3xl text-center m-6 text-white font-extrabold w-3/4 bg-yellow-500 shadow-sm rounded p-2">
                    <Link to={link}>KAKAO LOGIN</Link>
                </div>
            </div>
        </div>
    )
}

export default KakaoLoginComponent