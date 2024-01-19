import React, { useState } from 'react'
import ResultModal from '../common/ResultModal';
import { addData } from '../../api/toDoApi';
import useMove from '../../hooks/useMove';

const initState = {
    title: '',
    content: '',
    dueDate: ''
}

function AddComponent() {

    const [toDo, setToDo] = useState({ ...initState });
    const [result, setResult] = useState(null); // POST 결과를 저장
    const {moveToList} = useMove();

    const handleChange = (event) => {
        // name 은 input 태그의 name
        toDo[event.target.name] = event.target.value;
        setToDo({ ...toDo });
    }

    const handleClickAdd = () => {
        if(toDo.title !== '' && toDo.content !== '' && toDo.dueDate !== '') {
            if(window.confirm("저장하시겠습니까?")) {
                addData(toDo).then(data => {
                    setResult(data.ToDoNo);
                    setToDo({...initState}) // toDo 데이터 초기화
                })
            }
        } else {
            alert('모든 값은 필수입니다.')
        }
    }

    const handleClickClose = () => {
        setResult(null);    // null 로 변경하면 결과 Modal 이 사라진다
        moveToList();
    }   


    return (
        <div className="border-2 border-sky-200 mt-5 m-2 p-4">
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Title</div>
                    <input className="w-3/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="title" type={'text'} value={toDo.title} onChange={handleChange}></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Content</div>
                    <input className="w-3/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="content"
                        type={'text'} value={toDo.content} onChange={handleChange}></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">DUEDATE</div>
                    <input className="w-3/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="dueDate" type={'date'} value={toDo.dueDate} onChange={handleChange}></input>
                </div>
            </div>
            <div className="flex justify-end">
                <div className="relative mb-2 flex p-4 flex-wrap items-stretch">
                    <button type="button"
                        onClick={moveToList}
                        className="rounded p-3 w-36 bg-red-400 text-xl text-white" > Cancel </button>
                </div>
                <div className="relative mb-2 flex p-4 flex-wrap items-stretch">
                    <button type="button"
                        onClick={handleClickAdd}
                        className="rounded p-3 w-36 bg-blue-500 text-xl text-white" > Save </button>
                </div>
            </div>
            {result ? <ResultModal title={'Success'} content={`${result} ToDo Added`} callbackFn={handleClickClose} />
                    : <></>}
        </div>
    )
}

export default AddComponent