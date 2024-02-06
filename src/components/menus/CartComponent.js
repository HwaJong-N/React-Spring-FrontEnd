import React, { useEffect } from 'react'
import { useLogin } from "../../hooks/useLogin"
import { useCart } from "../../hooks/useCart"
import CartItemComponent from '../cart/CartItemComponent';

function CartComponent() {

    const { isLogin, loginState } = useLogin();
    const { cartItems, getCart, changeCart } = useCart();

    useEffect(() => {
        if (isLogin) {
            getCart();
        }
    }, [isLogin])

    return (
        <div className="w-full">
            {isLogin ?
                <div className="flex flex-col">
                    <div className="w-full flex">
                        <div className="bg-blue-500 text-center text-white font-bold w-2/5 rounded-full m-1">
                            {cartItems.length}
                        </div>
                    </div>
                    <div>
                        <ul> {cartItems.map(item => <CartItemComponent {...item} key={item.cartItemNo} changeCart={changeCart} email={loginState.email}/>)}</ul>
                    </div>
                </div>
                :
                <></>
            }
        </div>
    );
}

export default CartComponent