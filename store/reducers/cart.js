import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import CartItem from "../../models/cart-item";
import { ADD_ORDER } from "../actions/orders";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
    items: {},
    totalAmount: Number(0),
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product;
            const prodPrice = Number(addedProduct.price);
            const prodTitle = addedProduct.title;

            let updatedOrNewCartItem;

            if (state.items[addedProduct.id]) {
                // already have the item in the cart
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + Number(prodPrice)
                );
            } else {
                updatedOrNewCartItem = new CartItem(
                    1,
                    prodPrice,
                    prodTitle,
                    prodPrice
                );
            }
            return {
                ...state,
                items: {
                    ...state.items,
                    [addedProduct.id]: updatedOrNewCartItem,
                },
                totalAmount: (Number(state.totalAmount) + Number(prodPrice)).toFixed(2),
            };
        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.pId];
            const currentQty = selectedCartItem.quantity;
            let updatedCartItems;
            if (currentQty > 1) {
                // need to reduce it, not erase it
                const updatedCartItem = new CartItem(
                    selectedCartItem.quantity - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice
                );
                updatedCartItems = {
                    ...state.items,
                    [action.pId]: updatedCartItem,
                };
            } else {
                updatedCartItems = {...state.items };
                delete updatedCartItems[action.pId];
            }
            return {
                ...state,
                items: updatedCartItems,
                totalAmount: (Number(state.totalAmount) - Number(selectedCartItem.productPrice)).toFixed(2),
            };
        case ADD_ORDER:
            return initialState;
        case DELETE_PRODUCT:
            if (!state.items[action.pId]) {
                return state;
            }
            const updatedItems = {...state.items };
            const itemTotal = state.items[action.pId].sum;
            delete updatedItems[action.pId];
            return {
                ...state,
                items: updatedItems,
                totalAmount: state.totalAmount - itemTotal
            }
    }

    return state;
};