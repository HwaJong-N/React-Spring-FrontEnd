import React from 'react'

function CartItemComponent({ cartItemNo, itemName, price, itemId, quantity, imageFile, changeCart, email }) {
  const API_SERVER_HOST = 'http://localhost:8080';
  
  const handleClickQty = (amount) => {
    changeCart({
      cartItemNo: cartItemNo,
      itemId: itemId,
      quantity: quantity + amount,
      email: email
    })
  }

  return (
    <li key={cartItemNo} className="border-2 w-full">
      <div className="border-2 p-1 flex">
        <img src={`${API_SERVER_HOST}/api/items/view/th_${imageFile}`} className="w-1/2" alt={itemName} />
        <div className="w-1/2 p-1 text-xl flex flex-col justify-between">
          <div className="flex text-white font-bold p-2 justify-end">
            <button
              className="text-base text-black w-3"
              onClick={() => handleClickQty(-1 * quantity)}>X
            </button>
          </div>
          <div className="justify-end w-full"> </div>
          <div>상품명 : {itemName}</div>
          <div>가격 : {price}</div>
          <div>수량 : {quantity}</div>
          <div className="flex text-white font-bold p-2 justify-center">
            <button className="m-1 p-1 text-2xl bg-orange-500 w-8 rounded-lg"
              onClick={() => handleClickQty(1)}>+ </button>
            <button className="m-1 p-1 text-2xl bg-orange-500 w-8 rounded-lg"
              onClick={() => handleClickQty(-1)}>-</button>
          </div>
          <div className='font-extrabold border-t-2 text-right m-2 pr-4'>
            {quantity * price} 원
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItemComponent