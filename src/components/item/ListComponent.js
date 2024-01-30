import React, { useEffect, useState } from 'react'
import useMove from '../../hooks/useMove';
import { getList } from '../../api/itemApi';
import FetchingModal from '../common/FetchingModal';
import { API_SERVER_HOST } from "../../api/itemApi";
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

    const { moveToList, moveToRead, page, size, refresh } = useMove();
    const [serverData, setServerData] = useState(initState);
    const [fetching, setFetching] = useState(false);

    useEffect(() => {
        setFetching(true);  // 처리 중을 나타냄

        getList({ page, size }).then(data => {
            setServerData(data);
            setFetching(false);
        })
    }, [page, size, refresh]);


    return (
        <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
            {fetching ? <FetchingModal /> : <></>}
            <div className="flex flex-wrap mx-auto p-6">
                {serverData.dtoList.map(item =>
                    <div key={item.itemId} className="w-1/2 p-1 rounded shadow-md border-2" onClick={() => moveToRead(item.itemId)}>
                        <div className="flex flex-col h-full">
                            <div className="font-extrabold text-2xl p-2 w-full ">{item.itemId}</div>
                            <div className="text-1xl m-1 p-2 w-full flex flex-col">
                                <div className="w-full overflow-hidden ">
                                    <img alt="item" className="m-auto rounded-md w-60"
                                        src={`${API_SERVER_HOST}/api/items/view/th_${item.uploadedFileNames[0]}`} />
                                </div>
                                <div className="bottom-0 font-extrabold bg-white">
                                    <div className="text-center p-1">
                                        이름: {item.itemName}
                                    </div>
                                    <div className="text-center p-1">
                                        가격: {item.price}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <PageComponent serverData={serverData} movePage={moveToList}></PageComponent>
        </div>
    );

}

export default ListComponent