import React from 'react'
import { useParams } from 'react-router-dom';
import ReadComponent from '../../components/item/ReadComponent';

function ReadPage() {
    const {itemId} = useParams();

    return (
        <div className='font-extrabold w-full bg-white mt-6 py-3'>
            <div className='text-2xl text-center'>
                Item Read Page
            </div>

            <ReadComponent itemId={itemId} />            
        </div>
    )
}

export default ReadPage