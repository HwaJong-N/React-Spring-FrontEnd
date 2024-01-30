import React from 'react'

function FetchingModal() {
    return (
        <div className={`fixed top-0 left-0 z-[1055] flex h-full w-full justify-center items-center bg-black bg-opacity-50`}>
            <div className="text-white text-5xl font-bold ">
                처리 중입니다...
            </div>
        </div>
    );
}

export default FetchingModal