import React, { useEffect, useState } from 'react'
import useMove from '../../hooks/useMove';
import { getList } from '../../api/toDoApi';
import PageComponent from '../common/PageComponent';


const initState = {
    dtoList: [],
    pageNumberList: [],
    requestDTO: null,
    prev: false,
    next: false,
    totoalCount: 0,
    prevPage: 0,
    nextPage: 0,
    totalPage: 0,
    currentPage: 0
}



function ListComponent() {

    const { page, size, refresh, moveToList, moveToRead } = useMove();
    const [serverData, setServerData] = useState(initState);

    useEffect(() => {
        getList({ page, size }).then(data => {
            setServerData(data);
        });
    }, [page, size, refresh])

    return (
        <div className="border-2 border-blue-100 mt-5 mr-2 ml-2">
            <div className="flex flex-wrap mx-auto justify-center p-6">
                {serverData.dtoList.map(toDo =>
                    <div key={toDo.toDoNo} className="w-full min-w-[400px] p-2 m-2 rounded shadow-md"
                        onClick={() => moveToRead(toDo.toDoNo)}>
                        <div className="flex ">
                            <div className="p-2 w-1/12 text-lg"> {toDo.toDoNo} </div>
                            <div className="m-1 p-2 w-8/12 text-sm">{toDo.title}</div>
                            <div className="m-1 p-2 w-8/12 text-sm">{toDo.content}</div>
                            <div className="m-1 p-2 w-2/12 text-sm"> {toDo.dueDate} </div>
                        </div>
                    </div> 
                )}
            </div>
            <PageComponent serverData={serverData} movePage={moveToList}></PageComponent>
        </div>
    )
}

export default ListComponent