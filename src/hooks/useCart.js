import { useDispatch, useSelector } from "react-redux";
import { getCartItemsAsync, postChangeCartItemAsync } from "../slices/cartSlice";


export const useCart = () => {
    const cartItems = useSelector(state => state.cartSlice);
    const dispatch = useDispatch();

    const getCart = () => {
        dispatch(getCartItemsAsync());
    }

    const changeCart = (cartItem) => {
        dispatch(postChangeCartItemAsync(cartItem));
    }

    return {cartItems, getCart, changeCart}
}