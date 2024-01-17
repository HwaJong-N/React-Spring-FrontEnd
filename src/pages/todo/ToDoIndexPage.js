import React, { useCallback } from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import { Outlet, useNavigate } from "react-router-dom"

function ToDoIndexPage() {

    const navigate = useNavigate();

    const handleListClick = useCallback(() => {
        navigate({
            pathname:'list'
        })
    },[]);

    const handleAddClick = useCallback(() => {
        navigate({
            pathname:'add'
        })
    },[]);


    return (
        <BasicLayout>
            <div className='w-full flex m-2 p-2'>
                <div className='text-xl m-1 p-2 w-20 font-extrabold text-center underline'
                    onClick={handleListClick}>
                    List
                </div>
                <div className='text-xl m-1 p-2 w-20 font-extrabold text-center underline'
                    onClick={handleAddClick}>
                    Add
                </div>
            </div>
            <div className='flex flex-wrap w-full'>
                <Outlet />
            </div>
        </BasicLayout>
    )
}

export default ToDoIndexPage