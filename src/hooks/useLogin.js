import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { loginPostAsync, logout } from '../slices/loginSlice';
import { Navigate } from "react-router-dom";

export const useLogin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginState = useSelector(state => state.loginSlice);


    const isLogin = loginState.email ? true : false;    // 로그인 여부

    // 비동기로 로그인을 처리하는 함수를 호출
    const doLogin = async(loginParam) => {
        const action = await dispatch(loginPostAsync(loginParam));
        return action.payload;
    }

    const doLogout = () => {
        dispatch(logout());
    }

    const moveToPath = (path)    => {
        navigate({pathname: path}, {replace:true});  // 뒤로 가기 없이 페이지 이동
    }

    const moveToLogin = () => { // 로그인 페이지로 이동
        navigate({pathname: '/member/login'});
    }

    const moveToLoginReturn = () => {
        return <Navigate replace to="/member/login" />
    }

    return {loginState, isLogin, doLogin, doLogout, moveToPath, moveToLogin, moveToLoginReturn}
}