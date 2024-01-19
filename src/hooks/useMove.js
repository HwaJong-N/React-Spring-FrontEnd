import { useState } from "react";
import { createSearchParams, useNavigate, useSearchParams } from "react-router-dom";

const getValue = (param, defaultValue) => {
    if(!param) {
        return defaultValue;
    }
    return parseInt(param);
}

const useMove = () => {
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);
    const [searchParam, setSearchParam] = useSearchParams();

    const page = getValue(searchParam.get('page'), 1);
    const size = getValue(searchParam.get('size'), 10);

    // 쿼리 파라미터를 자동으로 생성해주는 함수
    const queryDefault = createSearchParams({page, size}).toString()

    const moveToList = (pageParam) => {
        let queryStr = '';

        if(pageParam) {
            const pageNum = getValue(pageParam.page, 1);
            const sizeNum = getValue(pageParam.size, 10);
            queryStr = createSearchParams({page: pageNum, size:sizeNum}).toString();
        } else {
            queryStr = queryDefault;
        }

        // 동일한 페이지 클릭 시, state 가 변경되지 않아 새로 로딩되지 않는 것 수정
        setRefresh(!refresh);

        navigate({
            pathname: '../list',
            search: queryStr
        })
    }


    const moveToModify = (toDoNo) => {
        navigate({
            pathname: `../modify/${toDoNo}`,
            search: queryDefault
        })
    }


    const moveToRead = (toDoNo) => {
        navigate({
            pathname: `../read/${toDoNo}`,
            search: queryDefault
        })
    }

    return {moveToList, moveToModify, moveToRead, page, size, refresh}
}

export default useMove;