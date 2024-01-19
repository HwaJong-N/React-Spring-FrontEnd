import React from 'react'
import ListComponent from '../../components/todo/ListComponent';

function ListPage() {
  return (
    <div className='p-4 full bg-white'>
      <div className='text-3xl font-extrabold text-center pt-2'>
        ToDo List Page
        <ListComponent />
      </div>
    </div>
  )
}

export default ListPage