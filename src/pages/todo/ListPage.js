import React from 'react'
import { useSearchParams } from 'react-router-dom'

function ListPage() {

    const [searchParams, setSearchParams] = useSearchParams();

    const page = searchParams.get('page') ? parseInt(searchParams.get('page')) : 1;
    const size = searchParams.get('size') ? parseInt(searchParams.get('size')) : 10;


    return (
      <div className='p-4 full bg-white'>
        <div className='text-3xl font-extrabold'>
          ToDo List Page Component -- page : {page} -- size : {size}
        </div>
      </div>
    )
}

export default ListPage