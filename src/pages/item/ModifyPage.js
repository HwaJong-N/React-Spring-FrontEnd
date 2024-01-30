import React from 'react'
import ModifyComponent from '../../components/item/ModifyComponent'
import { useParams } from 'react-router-dom'

function ModifyPage() {

    const {itemId} = useParams();

    return (
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold text-center">
                Item Modify Page
            </div>
            <ModifyComponent itemId={itemId}/>
        </div>
    )
        
}

export default ModifyPage