import axios from "axios";

export const API_SERVER_HOST = 'http://localhost:8080';
const prefix = `${API_SERVER_HOST}/api/items`


export const getList = async(pageParam) => {
    const {page, size} = pageParam;
    const res = await axios.get(`${prefix}/list`, {params: {page: page, size: size}});
    return res.data;
}


export const getItem = async(itemId) => {
    const res = await axios.get(`${prefix}/${itemId}`);
    return res.data;
}


export const deleteItem = async(itemId) => {
    const res = await axios.delete(`${prefix}/${itemId}`);
    return res.data;
}



export const addItem = async(itemObj) => {
    const header = {
        headers: {
            "Content-Type" : "multipart/form-data"
        }
    }
    const res = await axios.post(`${prefix}/add`, itemObj, header);
    return res.data;
}


export const modifyItem = async(itemId, itemObj) => {
    const header = {
        headers: {
            "Content-Type" : "multipart/form-data"
        }
    }
    const res = await axios.put(`${prefix}/${itemId}`, itemObj, header);
    return res.data;
}
