import React from 'react'
import { useCallback } from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import { useNavigate, Outlet } from 'react-router-dom'


function IndexPage() {

  const navigate = useNavigate();

  // 부모 컴포넌트가 리렌더링될 때마다 자식 컴포넌트에게 전달되는 함수를 매번 새로 생성하지 않고, 메모이제이션된 함수를 사용
  const handleClickList = useCallback(() => {
    navigate({ pathname: 'list' })
  });

  const handleClickAdd = useCallback(() => {
    navigate({ pathname: 'add' })
  });



  return (
    <BasicLayout>
      <div className='w-full flex justify-end mb-2 pb-2'>
        <button className='text-xl mb-2 px-4 py-2 font-extrabold bg-green-500 text-white rounded'
          onClick={handleClickList}>
          List
        </button>
        <button className='text-xl mb-2 ml-2 px-4 py-2 font-extrabold bg-blue-500 text-white rounded'
          onClick={handleClickAdd}>
          Add
        </button>
      </div>
      <div className="flex flex-wrap w-full ">
        <Outlet />
      </div>
    </BasicLayout>
  )
}

export default IndexPage