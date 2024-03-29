import React from 'react'
import BasicMenu from '../components/menus/BasicMenu';
import CartComponent from '../components/menus/CartComponent';

function BasicLayout({ children }) {
  return (
    <>
      <BasicMenu />
      <div className="bg-white my-5 w-full flex flex-col space-y-1 md:flex-row md:space-x-1 md:space-y-0">
        <main className="bg-indigo-200 md:w-4/5 lg:w-3/4 px-5 py-5">
          {children}
        </main>
        <aside className="border border-solid border-gray-400 md:w-1/5 lg:w-1/4 px-5 flex py-5">
          <h1 className="text-2xl md:text-4xl">
            <CartComponent />
          </h1>
        </aside>
      </div>
    </>
  );
}

export default BasicLayout