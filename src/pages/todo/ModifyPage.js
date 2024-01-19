import React from 'react'
import ModifyComponent from '../../components/todo/ModifyComponent'
import { useParams } from 'react-router-dom'

function ModifyPage() {

  const {toDoNo} = useParams();

  return (
    <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold text-center">
                Todo Modify Page
            </div>
            <ModifyComponent tno={toDoNo}/>
        </div>
  )
}

export default ModifyPage