import React from 'react'

function ResultModal({title, content, callbackFn}) {
    return (
        <div className={`fixed top-0 left-0 z-[1055] flex h-full w-full justify-center bg-black bg-opacity-20`} 
            onClick={() => { if(callbackFn) { callbackFn() } }}>
            <div className="absolute bg-white shadow dark:bg-gray-700 opacity-100 w-1/4 rounded mt-10 mb-10 px-6 min-w-[600px]">
                <div className="justify-center bg-warning-400 mt-3 mb-6 text-base border-b-2 border-gray-200"> {title} </div>
                <div className="text-4xl text-center"> {content} </div>
                <div className="justify-end flex ">
                <button className="rounded bg-gray-500 mt-4 mb-4 px-4 pt-2 pb-2 text-base text-white" 
                    onClick={() => { if(callbackFn) { callbackFn() } }}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default ResultModal