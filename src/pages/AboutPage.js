import React from 'react'
import BasicLayout from '../layouts/BasicLayout'
import { useLogin } from '../hooks/useLogin'

function AboutPage() {

  const { isLogin, moveToLoginReturn } = useLogin();

  // 로그인 하지 않았다면 로그인 페이지로 이동
  if (!isLogin) {
    return moveToLoginReturn();
  }

  return (
    <BasicLayout>
      <div className={'text-3xl'}>About Page</div>
    </BasicLayout>
  )
}

export default AboutPage