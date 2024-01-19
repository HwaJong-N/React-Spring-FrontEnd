import React from 'react'
import { useState, useEffect } from 'react'
import { getSingleData, deleteData } from '../../api/toDoApi';
import useMove from '../../hooks/useMove';
import ResultModal from '../common/ResultModal';

const initState = {
    toDoNo: 0,
    title: '',
    content: '',
    dueDate: '',
    complete: false
}


function ReadComponent({ tno }) {
    const [toDo, setToDo] = useState(initState);
    const { moveToList, moveToModify } = useMove();
    const [result, setResult] = useState(null); // 삭제 결과를 저장

    const handleClickDelete = () => {
        if(window.confirm("삭제하시겠습니까?")) {
            setResult(toDo.toDoNo);
            deleteData(toDo.toDoNo);
        }
    }

    const handleClickClose = () => {
        setResult(null);    // null 로 변경하면 결과 Modal 이 사라진다
        setToDo({...initState});
        moveToList();
    }  

    useEffect(() => {
        getSingleData(tno).then(data => {
            setToDo(data)
        })
    }, [tno]);

    return (
        <div className="border-2 border-sky-200 mt-5 m-2 p-4">
            {makeDiv('No', toDo.toDoNo)}
            {makeDiv('Title', toDo.title)}
            {makeDiv('Content', toDo.content)}
            {makeDiv('Completed', toDo.complete ? 'Completed' : 'Not Yet')}

            <div className="flex justify-end p-4">
                <button type="button"
                    className="rounded p-4 m-2 w-32 text-white bg-blue-500"
                    onClick={() => moveToList()}>
                    Back To List
                </button>
                <button type="button"
                    className="rounded p-4 m-2 w-32 text-white bg-green-500"
                    onClick={() => moveToModify(toDo.toDoNo)}>
                    Modify
                </button>
                <button type="button"
                    className="rounded p-4 m-2 w-32 text-white bg-red-400"
                    onClick={handleClickDelete}>
                    Remove
                </button>
            </div>
            {result ? <ResultModal title={'Success'} content={`${result} ToDo Deleted`} callbackFn={handleClickClose} />
                    : <></>}
        </div>
    )
}


const makeDiv = (title, value) =>
    <div className="flex justify-center mt-5">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
            <div className="w-1/5 p-6 text-right font-bold">{title}</div>
            <div className="w-3/5 p-6 rounded-r border border-solid shadow-md">
                {value}
            </div>
        </div>
    </div>



export default ReadComponent