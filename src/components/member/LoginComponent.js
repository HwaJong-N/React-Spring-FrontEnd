import React, { useState } from 'react'
import { useLogin } from '../../hooks/useLogin';
import KakaoLoginComponent from './KakaoLoginComponent';

const initState = {
    email: '',
    password: ''
}

function LoginComponent() {

    const [loginParam, setLoginParam] = useState(initState);

    const {doLogin, moveToPath} = useLogin();

    const handleClickLogin = () => {
        doLogin(loginParam)
        .then(data => {
            if(data.error) {
                alert("로그인에 실패하였습니다");
            } else {
                moveToPath("/")
            }
        })
    }

    const handleChange = (event) => {
        loginParam[event.target.name] = event.target.value;
        setLoginParam({ ...loginParam });
    }

    return (
        <div className="border-2 border-purple-400 mt-10 m-2 p-4">
            <div className="flex justify-center">
                <div className="text-4xl m-4 p-4 font-extrabold text-black">로그인</div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">Email</div>
                    <input
                        className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="email" type={'text'} value={loginParam.email} onChange={handleChange}
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">Password</div>
                    <input
                        className="w-full p-3 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="password" type={'password'} value={loginParam.password} onChange={handleChange}
                    />
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full justify-center">
                    <div className="w-3/5 p-6 flex justify-center font-bold">
                        <button className="rounded-full p-4 w-44 bg-purple-400 text-xl text-white" onClick={handleClickLogin}>
                            LOGIN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginComponent