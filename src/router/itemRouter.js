import React from 'react'
import { Suspense, lazy } from "react";
import { Navigate } from 'react-router-dom';

const Loading = <div>Loading...</div>

const ItemList = lazy(() => import("../pages/item/ListPage"))
const ItemAdd = lazy(() => import("../pages/item/AddPage"))
const ItemRead = lazy(() => import("../pages/item/ReadPage"))
const ItemModify = lazy(() => import("../pages/item/ModifyPage"))

const itemRouter = () => {
  return [
    {
        path: 'list',
        element: <Suspense fallback={Loading}><ItemList/></Suspense>
    },
    {
        path: '',
        element: <Navigate replace={true} to={'/items/list'}></Navigate>
    },
    {
      path: 'add',
      element: <Suspense fallback={Loading}><ItemAdd/></Suspense>
    },
    {
      path: 'read/:itemId',
      element: <Suspense fallback={Loading}><ItemRead/></Suspense>
    },
    {
      path: 'modify/:itemId',
      element: <Suspense fallback={Loading}><ItemModify/></Suspense>
    }
  ]
}

export default itemRouter