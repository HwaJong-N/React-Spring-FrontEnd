import React from 'react'
import { useDispatch } from 'react-redux'
import { useLogin } from '../../hooks/useLogin';

function LogoutComponent() {

    const {doLogout, moveToPath} = useLogin();

    const handleClickLogout = () => {
        doLogout();
        alert('로그아웃 되었습니다')
        moveToPath("/");
    }

    return (
        <div className={"fixed top-0 left-0 z-[1055] flex h-full w-full justify-center items-center bg-black bg-opacity-60"}>
            <div className="rounded border-2 bg-white mt-10 m-2 p-4">
                <div className="flex justify-center">
                    <div className="text-3xl m-4 p-4 font-extrabold text-black">
                        로그아웃하시겠습니까?
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="relative mb-4 flex w-full justify-center">
                        <div className="w-2/5 p-6 flex justify-center font-bold">
                            <button className="rounded p-4 w-36 bg-red-500 text-xl text-white"
                                onClick={handleClickLogout} > LOGOUT </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default LogoutComponent