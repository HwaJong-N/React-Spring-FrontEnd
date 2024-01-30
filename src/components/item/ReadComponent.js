import React, { useState, useEffect } from 'react'
import useMove from '../../hooks/useMove';
import { API_SERVER_HOST, getItem, deleteItem } from '../../api/itemApi';
import FetchingModal from '../common/FetchingModal';
import ResultModal from '../common/ResultModal';


const initState = {
    itemId: 0,
    itemName: '',
    itemDesc: '',
    price: 0,
    uploadedFileNames: []
}


function ReadComponent({ itemId }) {

    const [item, setItem] = useState(initState);
    const [fetching, setFetching] = useState(false);
    const [result, setResult] = useState(null); // 삭제 결과를 저장

    const { moveToList, moveToModify } = useMove();

    const handleClickDelete = () => {
        if(window.confirm("삭제하시겠습니까?")) {
            setResult(item.itemId);
            deleteItem(item.itemId);
        }
    }

    const closeModal = () => {
        setResult(null);    // null 로 변경하면 결과 Modal 이 사라진다
        setItem({...initState});
        moveToList();
    }

    useEffect(() => {
        setFetching(true);
        getItem(itemId).then(data => {
            setItem(data);
            setFetching(false);
        })
    }, [itemId]);

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {fetching ? <FetchingModal /> : <></>}
            {result ? <ResultModal title={'Success'} content={`${result}번 상품이 삭제되었습니다`} callbackFn={closeModal} />
                    : <></>}
            <div className="flex justify-center mt-10">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Item No</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{item.itemId}</div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Item Name</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{item.itemName}</div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Price</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{item.price}</div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Item Desc</div>
                    <div className="w-4/5 p-6 rounded-r border border-solid shadow-md">{item.itemDesc}</div>
                </div>
            </div>
            <div className="w-full justify-center flex flex-col m-auto items-center">
                {item.uploadedFileNames.map((imgFile, i) =>
                    <img alt="item" key={i} className="p-4 w-1/2" src={`${API_SERVER_HOST}/api/items/view/${imgFile}`} />
                )}
            </div>
            <div className="flex justify-end p-4">
                <button type="button"
                    className="rounded p-4 m-2 w-32 text-white bg-blue-500"
                    onClick={() => moveToList()}>
                    Back To List
                </button>
                <button type="button"
                    className="rounded p-4 m-2 w-32 text-white bg-green-500"
                    onClick={() => moveToModify(item.itemId)}>
                    Modify
                </button>
                <button type="button"
                    className="rounded p-4 m-2 w-32 text-white bg-red-400"
                    onClick={handleClickDelete}>
                    Remove
                </button>
            </div>
        </div>
    )
}
export default ReadComponent
