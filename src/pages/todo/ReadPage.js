import React from 'react'
import ReadComponent from '../../components/todo/ReadComponent';
import { useParams } from 'react-router-dom';

function ReadPage() {
    const {toDoNo} = useParams();   // 구조분해할당

    return (
        <div className='font-extrabold w-full bg-white mt-6 py-3'>
            <div className='text-2xl text-center'>
                ToDo Read Page : {toDoNo}
            </div>

            <ReadComponent tno={toDoNo}/>
        </div>
    )
}

export default ReadPage