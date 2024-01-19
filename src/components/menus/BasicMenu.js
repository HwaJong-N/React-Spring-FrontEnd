import React from 'react'
import { Link } from 'react-router-dom';

function BasicMenu() {
    return (
        <nav id='navbar' className=" flex bg-blue-300">
            <div className="w-4/5 bg-[#5161ceee]" >
                <ul className="flex p-4 text-white font-bold">
                    {/**
                    <li className="pr-6 text-2xl">
                        <Link to={'/'}>Main</Link>
                    </li>
                    <li className="pr-6 text-2xl">
                        <Link to={'/about'}>About</Link>
                    </li>
                     */}
                    <li className="pr-6 text-2xl">
                        <Link to={'/todo/'}>ToDo</Link>
                    </li>
                </ul>
            </div>
            <div className="w-1/5 flex justify-end p-4 font-medium bg-[#5161ceee]">
                <div className="text-white text-m m-1 rounded" >Login</div>
            </div>
        </nav>
    );
}

export default BasicMenu