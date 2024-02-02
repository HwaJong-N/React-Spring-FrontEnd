import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { modifyMember } from '../../api/memberApi';
import { useNavigate } from 'react-router-dom';
import ResultModal from '../common/ResultModal';


// 수정 가능한 정보들
const initState = {
    password: '',
    nickname: ''
}

function ModifyComponent() {

    const loginInfo = useSelector(state => state.loginSlice);
    const [member, setMember] = useState(initState);
    const [result, setResult] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setMember({ ...loginInfo, password:'' });
    }, [loginInfo]);

    const handleChange = (event) => {
        member[event.target.name] = event.target.value;
        setMember({ ...member });
    }

    const handleClickSave = () => {
        if(window.confirm("저장하시겠습니까?")) {
            modifyMember(member).then((data) => {
                setResult(data.result);
            })
        }
    }

    const closeModal = () => {
        setResult(null);
        navigate({pathname:"/"})
    }

    return (
        <div className="mt-6">
            {result ? <ResultModal
                title={'Success'}
                content={`${result}`}
                callbackFn={closeModal} />
                : <></>}
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Email</div>
                    <input className="w-3/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="email" type={'text'} value={member.email} readOnly>
                    </input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Password</div>
                    <input className="w-3/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="password" type={'password'} value={member.password} onChange={handleChange} >
                    </input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">Nickname</div>
                    <input className="w-3/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
                        name="nickname" type={'text'} value={member.nickname} onChange={handleChange} >
                    </input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap justify-end">
                    <button type="button" className="rounded p-3 m-2 text-xl w-32 text-white bg-blue-500" onClick={handleClickSave}>
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModifyComponent