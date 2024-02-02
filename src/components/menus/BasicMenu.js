import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function BasicMenu() {
    // 로그인 상태인지, 로그아웃 상태인지 ( loginSlice 가 가진 정보 )
    // state : 애플리케이션의 state 를 의미( Redux 스토어의 상태 )
    const loginState = useSelector(state => state.loginSlice);

    return (
        <nav id='navbar' className=" flex bg-blue-300">
            <div className="w-4/5 bg-[#5161ceee]" >
                <ul className="flex p-4 text-white font-bold">
                    <li className="pr-6 text-2xl">
                        <Link to={'/'}>Main</Link>
                    </li>
                    <li className="pr-6 text-2xl">
                        <Link to={'/about'}>About</Link>
                    </li>

                    {loginState.email ?
                        <>
                            <li className="pr-6 text-2xl">
                                <Link to={'/todo/'}>ToDo</Link>
                            </li>
                            <li className="pr-6 text-2xl">
                                <Link to={'/items/'}>Item</Link>
                            </li>
                        </>
                        : <></>
                    }
                </ul>
            </div>
            <div className="w-1/5 flex justify-end p-4 font-medium bg-[#5161ceee]">
                <div className="text-white text-m m-1 rounded flex items-center">
                    {loginState.email ?
                        <>
                            <p className="mr-2">안녕하세요 {loginState.nickname}님</p>
                            <hr className="h-4 border-l-2 border-white mr-2" />
                            <Link to={'/member/logout'}>Logout</Link>
                        </>
                        : <Link to={'/member/login'}>Login</Link>
                    }
                </div>
            </div>
        </nav>
    );
}

export default BasicMenu