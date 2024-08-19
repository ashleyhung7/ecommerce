/*

Create context for cart.

getProductQuantity: takes in item id, returns total quantity of item.
addOneToCart: takes in item id and increments quantity of item.
removeOneFromCart: takes in item id and decrements quantity of item, if it exists.
deleteFromCart: takes in item id and sets cart to a new array of all items except input item, if it exists.
getTotalCost: returns total cost of all items in cart.

*/

import { createContext, useState } from 'react';
import { productsArray, getProductData } from './productStore';

export const CartContext = createContext({
    items: [],
    getProductQuantity: () => {},
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    deleteFromCart: () => {},
    getTotalCost: () => {},
});

export function CartProvider({children}) {
    const [cartProducts, setCartProducts] = useState([]);

    // Cart will store { id, quanitity }

    function getProductQuantity(id) {
       const quantity = cartProducts.find(product => product.id === id)?.quantity

        if (quantity === undefined) {
            return 0;
        }

        return quantity;
    }

    function addOneToCart(id) {
        const quantity = getProductQuantity(id);
        
        if (quantity === 0) {   // product not in cart
            setCartProducts(
                [
                    ...cartProducts,
                    {
                        id: id,
                        quantity: 1
                    }
                ]
            )
        } else {    // product in cart
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id
                    ? { ...product, quantity: product.quantity + 1 }
                    : product
                )
            )
        }
    }

    function removeOneFromCart(id) {
        const quantity = getProductQuantity(id);

        if (quantity === 1) {
            deleteFromCart(id);
        } else {
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id === id
                    ? { ...product, quantity: product.quantity - 1 }
                    : product
                )
            )
        }
    }

    function deleteFromCart(id) {
        setCartProducts(
            cartProducts =>
            cartProducts.filter(currentProduct => { // skip over product to remove
                return currentProduct.id !== id;
            })
        )
    }

    function getTotalCost() {
        let totalCost = 0;
        cartProducts.map((cartItem) => {
            const productData = getProductData(cartItem.id);
            totalCost += (productData.price * cartItem.quantity);
        });
        return totalCost;
    }
    
    const contextValue = {
        items: cartProducts,
        getProductQuantity,
        addOneToCart,
        removeOneFromCart,
        deleteFromCart,
        getTotalCost
    }


    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider