import jwtAxios from "../utils/jwtUtils";

export const API_SERVER_HOST = 'http://localhost:8080';
const prefix = `${API_SERVER_HOST}/api/cart`


export const getAllCartItems = async() => {
    const res = await jwtAxios.get(`${prefix}/items`);
    return res.data;
}


export const changeCartItem = async(cartItem) => {
    const res = await jwtAxios.post(`${prefix}/change`, cartItem);
    return res.data;
}