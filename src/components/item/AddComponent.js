import React, { useRef, useState } from 'react'
import { addItem } from '../../api/itemApi';
import FetchingModal from '../common/FetchingModal';
import ResultModal from '../common/ResultModal';
import useMove from '../../hooks/useMove';

const initState = {
    itemName: '',
    itemDesc: '',
    price: 0,
    files: []
}


function AddComponent() {

    const [fetching, setFetching] = useState(false);    // 처리 중인지를 나타내는 상태
    const [result, setResult] = useState(null);    // 저장 모달을 띄우기 위한 상태
    const [item, setItem] = useState(initState);
    // React 에서 DOM Element 를 식별하기 위해서 사용하는게 useRef
    const uploadRef = useRef();

    const { moveToList } = useMove();

    const handleChangeItem = (event) => {
        item[event.target.name] = event.target.value;
        setItem({ ...item });
    }

    const handleClickSave = () => {
        if (window.confirm("저장하시겠습니까?")) {
            const formData = new FormData();
            const files = uploadRef.current.files;

            // length : 파일이 몇 개가 올라가 있는지
            for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i]);
            }

            // formData 의 key 가 DTO 에 있는 변수명과 동일해야함
            formData.append("itemName", item.itemName);
            formData.append("itemDesc", item.itemDesc);
            formData.append("price", item.price);

            setFetching(true);

            addItem(formData).then(data => {
                setFetching(false);
                setResult(data.RESULT);
            });
        }
    }

    const closeModal = () => {
        setResult(null);
        moveToList();
    }


    return (
        <div className="border-2 border-sky-200 mt-5 m-2 p-4">
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Item Name</div>
                    <input className="w-3/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="itemName" type={'text'} value={item.itemName} onChange={handleChangeItem} >
                    </input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Desc</div>
                    <textarea
                        className="w-3/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
                        name="itemDesc" rows="4" onChange={handleChangeItem} value={item.itemDesc}>
                        {item.itemDesc}
                    </textarea>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Price</div>
                    <input
                        className="w-3/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="price" type={'number'} value={item.price} onChange={handleChangeItem}>
                    </input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Files</div>
                    {/* 파일 입력값에 대한 참조, current 를 출력하면 input 태그 자체가 출력된다 */}
                    <input
                        className="w-3/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        ref={uploadRef}
                        type={'file'}
                        multiple={true}>
                    </input>
                </div>
            </div>
            <div className="flex justify-end">
                <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
                    <button type="button"
                        onClick={moveToList}
                        className="rounded p-3 w-36 bg-red-400 text-xl text-white" > Cancel </button>
                </div>
                <div className="relative mb-4 flex p-4 flex-wrap items-stretch">
                    <button type="button"
                        className="rounded p-3 w-36 bg-blue-500 text-xl text-white"
                        onClick={handleClickSave} >
                        Save
                    </button>
                </div>
            </div>
            {fetching ? <FetchingModal /> : <></>}   {/* 저장이 처리 중이라면 처리 중이라는 모달을 띄운다 */}
            {result ? <ResultModal
                title={'Success'}
                content={`${result}번 상품 등록 완료!`}
                callbackFn={closeModal} />
                : <></>}
        </div>
    );
}
export default AddComponent;
