import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import todoRouter from "./todoRouter";
import itemRouter from "./itemRouter";
import memberRouter from "./memberRouter";

const Loading = <div>Loading...</div>

const Main = lazy(() => import("../pages/MainPage"))
const About = lazy(() => import("../pages/AboutPage"))
const TodoIndex = lazy(() => import("../pages/todo/ToDoIndexPage"))
const ItemIndex = lazy(() => import("../pages/item/ItemIndexPage"))

const root = createBrowserRouter([
    {
        path: '',
        element: <Suspense fallback={Loading}><Main /></Suspense>
    },
    {
        path: 'about',
        element: <Suspense fallback={Loading}><About /></Suspense>
    },
    {
        path: 'todo',
        element: <Suspense fallback={Loading}><TodoIndex /></Suspense>,
        children: todoRouter()
    },
    {
        path: 'items',
        element: <Suspense fallback={Loading}><ItemIndex /></Suspense>,
        children: itemRouter()
    },
    {
        path: 'member',
        children: memberRouter()
    }
])

export default root;