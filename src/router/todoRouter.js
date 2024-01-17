import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>Loading...</div>

const ToDoList = lazy(() => import("../pages/todo/ListPage"))
const ToDoRead = lazy(() => import("../pages/todo/ReadPage"))
const ToDoAdd = lazy(() => import("../pages/todo/AddPage"))
const ToDoModify = lazy(() => import("../pages/todo/ModifyPage"))

const todoRouter = () => {
    return [
        {
            path: 'list',
            element: <Suspense fallback={Loading}><ToDoList /></Suspense>
        },
        {
            path: '',
            element: <Navigate replace={true} to={'list'}></Navigate>
        },
        {
            path: 'read/:toDoNo',
            element: <Suspense fallback={Loading}><ToDoRead /></Suspense>
        },
        {
            path: 'add',
            element: <Suspense fallback={Loading}><ToDoAdd /></Suspense>
        },
        {
            path: 'modify/:toDoNo',
            element: <Suspense fallback={Loading}><ToDoModify /></Suspense>
        }
    ]
}

export default todoRouter;