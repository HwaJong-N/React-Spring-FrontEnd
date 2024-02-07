import React, { useEffect, useState, useRef } from 'react'
import { API_SERVER_HOST, getItem, modifyItem } from '../../api/itemApi';
import useMove from '../../hooks/useMove';
import FetchingModal from '../common/FetchingModal';
import ResultModal from '../common/ResultModal';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const initState = {
    itemId: 0,
    itemName: '',
    itemDesc: '',
    price: 0,
    delFlag: false,
    uploadedFileNames: []
}


function ModifyComponent({ itemId }) {

    const { moveToRead } = useMove();

    const [item, setItem] = useState(initState);
    const [fetching, setFetching] = useState(false);
    // const [result, setResult] = useState(null);
    const uploadRef = useRef();


    const query = useQuery({
        queryKey : ['items', itemId],
        queryFn : () => getItem(itemId),
        staleTime : Infinity
    })

    const modifyMutation = useMutation({
        mutationFn : (item) => modifyItem(itemId, item)
    })

    const queryClient = useQueryClient();


    useEffect(() => {
        if(query.isSuccess) {
            setItem(query.data);
        }
    }, [itemId, query.data, query.isSuccess])

    /*
    useEffect(() => {
        setFetching(true);
        getItem(itemId).then(data => {
            setItem(data);
            setFetching(false);
        })
    }, [itemId]);
    */

    const closeModal = () => {
        //setResult(null);
        if(modifyMutation.isSuccess) {
            queryClient.invalidateQueries(['items', itemId]);
            queryClient.invalidateQueries('items/list');
        }
        moveToRead(itemId);
    }

    const handleChangeItem = (event) => {
        item[event.target.name] = event.target.value;
        setItem({ ...item });
    }

    const deleteImage = (imageName) => {
        const remainImgs = item.uploadedFileNames.filter(imgName => imgName !== imageName);
        item.uploadedFileNames = remainImgs;
        setItem({...item});
    }

    const handleClickSave = () => {
        if(window.confirm("저장하시겠습니까?")) {
            const formData = new FormData();
            const files = uploadRef.current.files;

            for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i]);
            }

            formData.append("itemName", item.itemName);
            formData.append("itemDesc", item.itemDesc);
            formData.append("price", item.price);
            formData.append("delFlag", item.delFlag);


            // 업로드 된 파일 유지( 삭제한 파일은 상태 업데이트로 인해 배열에서 삭제되었음 )
            for(let i = 0; i < item.uploadedFileNames.length; i++) {
                formData.append("uploadedFileNames", item.uploadedFileNames[i]);
            }

            /*
            setFetching(true);
            modifyItem(itemId, formData).then(() => {
                setFetching(false);
                setResult(itemId);
                setItem({...initState})
            })
            */
           modifyMutation.mutate(formData);
        }
    }


    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            {/*
            {fetching ? <FetchingModal /> : <></>}
            {result ? <ResultModal
                title={'Success'}
                content={`${result}번 상품 수정 완료!`}
                callbackFn={closeModal} />
                : <></>}
            */}
            {query.isFetching || modifyMutation.isPending ? <FetchingModal /> : <></>}
            {modifyMutation.isSuccess ? <ResultModal 
                title={'Modify'}
                content={'수정되었습니다'}
                callbackFn={closeModal}/>
            : <></>}
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Item Name</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="itemName" type={'text'} value={item.itemName} onChange={handleChangeItem} ></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Item Desc</div>
                    <textarea className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md resize-y"
                        name="itemDesc" rows="4" onChange={handleChangeItem} value={item.itemDesc}> {item.itemDesc} </textarea>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Price</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="price" type={'number'} value={item.price} onChange={handleChangeItem}></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">DELETE</div>
                    <select
                        name="delFlag"
                        value={item.delFlag}
                        onChange={handleChangeItem}
                        className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                    >
                        <option value={false}>사용</option>
                        <option value={true}>삭제</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Files</div>
                    <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        ref={uploadRef}
                        type={'file'}
                        multiple={true}
                    ></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Images</div>
                    <div className="w-4/5 justify-center flex flex-wrap items-start">
                        {item.uploadedFileNames.map((imgFile, i) => (
                            <div className="flex justify-center flex-col w-1/3 m-1 align-baseline" key={i}>
                                <img alt="img" src={`${API_SERVER_HOST}/api/items/view/th_${imgFile}`} />
                                <button
                                    className="bg-red-500 text-3xl text-white p-0.5 rounded-full mb-2"
                                    onClick={() => deleteImage(imgFile)}>
                                    DELETE
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="flex justify-end p-4">
                <button type="button"
                    onClick={() => moveToRead(item.itemId)}
                    className="rounded p-3 m-2 w-36 bg-gray-500 text-xl text-white" > Back </button>
                <button type="button"
                    onClick={handleClickSave}
                    className="rounded  p-3 m-2 w-36 bg-blue-500 text-xl text-white" > Save </button>
            </div>
        </div>
    );
}


export default ModifyComponent