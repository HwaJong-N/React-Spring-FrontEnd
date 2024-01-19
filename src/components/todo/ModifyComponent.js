import React from 'react'
import { useState, useEffect } from 'react'
import useMove from '../../hooks/useMove';
import ResultModal from '../common/ResultModal';
import { getSingleData, modifyData } from '../../api/toDoApi';

const initState = {
    toDoNo: 0,
    title: '',
    content: '',
    dueDate: '',
    complete: false
}


function ModifyComponent({ tno }) {

    const { moveToRead } = useMove();
    const [toDo, setToDo] = useState(initState);
    const [result, setResult] = useState(null); // PUT 결과를 저장

    useEffect(() => {
        getSingleData(tno).then(data => {
            setToDo(data)
        })
    }, [tno]);


    const handleChange = (event) => {
        toDo[event.target.name] = event.target.value;
        setToDo({ ...toDo });
    }

    const handleChangeComplete = (event) => {
        const value = event.target.value;
        toDo.complete = (value === 'Y');
        setToDo({ ...toDo });
    }

    const handleClickSave = () => {
        if(window.confirm("저장하시겠습니까?")) {
            modifyData(toDo).then(data => {
                setResult(tno);
                setToDo({...initState}) // toDo 데이터 초기화
            })
        }
    }

    const handleClickClose = () => {
        setResult(null);    // null 로 변경하면 결과 Modal 이 사라진다
        moveToRead(tno);
    }   

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">No</div>
                    <div className="w-3/5 p-6 rounded-r border border-solid shadow-md bg-gray-100"> {toDo.toDoNo} </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">TITLE</div>
                    <input className="w-3/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="title" type={'text'} value={toDo.title} onChange={handleChange} ></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Content</div>
                    <input className="w-3/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="content" type={'text'} value={toDo.content} onChange={handleChange} ></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">DUEDATE</div>
                    <input className="w-3/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="dueDate" type={'date'} value={toDo.dueDate} onChange={handleChange} ></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">COMPLETE</div>
                    <select name="status" className="border-solid border-2 rounded m-1 p-2"
                        onChange={handleChangeComplete} value={toDo.complete ? 'Y' : 'N'} >
                        <option value='Y'>Completed</option>
                        <option value='N'>Not Yet</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-end p-4">
                <button type="button"
                    onClick={() => moveToRead(toDo.toDoNo)}
                    className="rounded p-3 m-2 w-36 bg-gray-500 text-xl text-white" > Back </button>
                <button type="button"
                    onClick={handleClickSave}
                    className="rounded  p-3 m-2 w-36 bg-blue-500 text-xl text-white" > Save </button>
            </div>
            {result ? <ResultModal title={'Success'} content={`${result} ToDo Modified`} callbackFn={handleClickClose} />
                    : <></>}
        </div>
    );

}

export default ModifyComponent