import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CartItem} from '../../types/Products';
import { 
    addCartItem,
    updateCartItemQuantity,
    deleteCartItem
} from "../../lib/axios/cart";
import {
    
} from "../../lib/axios/orders"

const initialState : {items: CartItem[]} = {
    items: []
}

export const addCartItemToDB = createAsyncThunk(
    'cart/cartItemAddedToDB',
    async (newItem : object, { dispatch }) => {   
        console.log(newItem);     
        const res = await addCartItem(newItem)
        dispatch(productAdded({
            
        }))
        return res
    }
)

export const updateCartItemQuantityToDB = createAsyncThunk(
    'cart/cartItemQuantityUpdated',
    async ({body, option} : {body: any, option: 'increase' | 'decrease' }, {dispatch}) => {
        const res = await updateCartItemQuantity(body, option)
        
        dispatch(productAdded({
            product: res.product, 
            quantity: res.quantity, 
            itemId: res.id
        }))
        return res    
    }
)

export const deleteCartItemFromDB = createAsyncThunk(
    'cart/cartItemDelted',
    async (data : object, { dispatch }) => {
        const res = await deleteCartItem(data)
        console.log(res)
        dispatch(productRemoved({
            product: res.product
        }))
    }
)

// export const createNewOrderFromCartItem = createAsyncThunk(
//     'cart/orderCreated',
//     async (data: object, {dispatch}) => {
//         const res = await saveOrder(data).then(res => console.log(res))
//     }
// )

const cartSlice = createSlice({
    name: 'cart',
    initialState, 
    reducers: {
        productAdded: (state, action) => {
            console.log("payload: " + action.payload)
            const itemId = state.items.findIndex(
                (item) => item.product.book_id === action.payload.product.product_id
              );
            if(itemId >= 0) {                                
                console.log(action.payload.quantity);
                state.items[itemId].quantity += action.payload.quantity
            } else{                
                const newItem = {
                    book_id: action.payload.itemId ? action.payload.itemId : "default id", 
                    product: action.payload.product, 
                    quantity: action.payload.quantity, 
                    selected: false,
                    appliedCouponValue: 0,
                    orderInfo: {
                        location: "",
                        note: ""
                    }
                }
                state.items = [newItem, ...state.items]
            }

        },
        productReduced: (state, action) => {
            state.items = state.items
                            .map(item => item.product.book_id === action.payload.product.book_id ? {...item, quantity: item.quantity-1} : item)
    
        },
        productRemoved: (state, action) => {
            state.items = state.items.filter(item => item.product.book_id !== action.payload.product.book_id)
        },
        itemSelected: (state, action) => {
            state.items = state.items.map(item => item.product.book_id === action.payload.product.book_id ? {...item, selected: !item.selected} : item)
            console.log(state.items);  
        },
        couponApplied: (state, action) => {
            state.items = state.items.map(item => item.product.book_id === action.payload.product.book_id ? {...item, appliedCouponValue: action.payload.appliedCoupon} : item)
        },
        orderInfoUpdated: (state, action) => {
            state.items = state.items.map(item => {
                return item.product.book_id === action.payload.product.book_id ? {...item, orderInfo: action.payload.orderInfo } : item
            })
        }
    
    },
    extraReducers: (builder) => {
        builder
        .addCase(addCartItemToDB.fulfilled, (state, action) => {
            console.log("123", action.payload)
        })
        .addCase(updateCartItemQuantityToDB.fulfilled, (state, action) => {
        })
        .addCase(deleteCartItemFromDB.fulfilled, () => {

        })
    }
})

export const { 
    productAdded,
    productReduced,
    productRemoved,
    itemSelected,
    couponApplied,
    orderInfoUpdated
} = cartSlice.actions

export default cartSlice.reducer