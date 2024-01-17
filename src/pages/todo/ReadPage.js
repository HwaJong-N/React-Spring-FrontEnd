import React from 'react'
import { createSearchParams, useNavigate, useParams, useSearchParams } from 'react-router-dom';

function ReadPage() {

    const [searchParams, setSearchParams] = useSearchParams();

    const page = searchParams.get('page') ? parseInt(searchParams.get('page')) : 1;
    const size = searchParams.get('size') ? parseInt(searchParams.get('size')) : 10;

    // 쿼리스트링을 생성하는 함수
    const queryString = createSearchParams({
        page: page, 
        size:size
    }).toString()

    const {toDoNo} = useParams();   // 구조분해할당
    const navigate = useNavigate();

    const handleModifyClick = (no) => {
        navigate({
            pathname: `/todo/modify/${no}`,
            search: queryString
        })
    }

    const handleListClick = () => {
        navigate({
            pathname: '/todo/list',
            search: queryString
        })
    }

    return (
        <div className={'text-3xl'}>ToDo ReadPage : {toDoNo}
            <div>
                <button onClick={() => handleModifyClick(toDoNo)}>Modify</button>
            </div>
            <div>
                <button onClick={handleListClick}>Move To List</button>
            </div>
        </div>
    )
}

export default ReadPage