import React, { useCallback } from 'react'
import BasicLayout from '../../layouts/BasicLayout'
import { Outlet, useNavigate } from "react-router-dom"

function ToDoIndexPage() {

    const navigate = useNavigate();

    const handleListClick = useCallback(() => {
        navigate({
            pathname: 'list'
        })
    }, []);

    const handleAddClick = useCallback(() => {
        navigate({
            pathname: 'add'
        })
    }, []);


    return (
        <BasicLayout>
            <div className='w-full flex justify-end mb-2 pb-2'>
                <button className='text-xl mb-2 px-4 py-2 font-extrabold bg-green-500 text-white rounded'
                    onClick={handleListClick}>
                    List
                </button>
                <button className='text-xl mb-2 ml-2 px-4 py-2 font-extrabold bg-blue-500 text-white rounded'
                    onClick={handleAddClick}>
                    Add
                </button>
            </div>
            <div className='flex flex-wrap w-full'>
                <Outlet />
            </div>
        </BasicLayout>
    )
}

export default ToDoIndexPage