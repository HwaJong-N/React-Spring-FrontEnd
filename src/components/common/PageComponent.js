import React from 'react'

function PageComponent({ serverData, movePage }) {
    return (
        <div className="m-6 flex justify-center">
            {serverData.prev ?
                <div className="m-2 p-2 w-16 text-center font-bold text-blue-400 text-lg"
                    onClick={() => movePage({ page: serverData.prevPage, size:serverData.numPerPage })}>
                    Prev
                </div> : <></>
            }
            {serverData.pageNumberList.map(pageNum =>
                <div key={pageNum}
                    className={`m-2 p-2 w-12 text-center rounded shadow-md text-white text-lg ${serverData.currentPage === pageNum ? 'bg-gray-500' : 'bg-blue-400'}`}
                    onClick={() => movePage({ page: pageNum, size:serverData.numPerPage })}>
                    {pageNum}
                </div>
            )}
            {serverData.next ?
                <div className="m-2 p-2 w-16 text-center font-bold text-blue-400 text-lg"
                    onClick={() => movePage({ page: serverData.nextPage, size:serverData.numPerPage })}>
                    Next
                </div> : <></>
            }
        </div>
    );
}

export default PageComponent