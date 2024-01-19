import axios from "axios";

export const API_SERVER_HOST = 'http://localhost:8080';

const prefix = `${API_SERVER_HOST}/api/todo`

export const getSingleData = async(toDoNO) => {
    const res = await axios.get(`${prefix}/${toDoNO}`);
    return res.data;
}

export const getList = async(pageParam) => {
    const {page, size} = pageParam;
    // config 의 인자로 params 와 값을 지정하면 ? 로 시작하는 쿼리 스트링으로 변환된다
    const res = await axios.get(`${prefix}/list`, {params:{
        page: page,
        size: size
    }});
    return res.data;
}


export const addData = async(toDoObj) => {
    const res = await axios.post(`${prefix}/add`, toDoObj);
    return res.data;
}


export const modifyData = async(toDoObj) => {
    const res = await axios.put(`${prefix}/${toDoObj.toDoNo}`, toDoObj);
    return res.data;
}


export const deleteData = async(toDoNo) => {
    const res = await axios.delete(`${prefix}/${toDoNo}`);
    return res.data;
}