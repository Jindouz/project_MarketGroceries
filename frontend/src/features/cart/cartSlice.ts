import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addOrder, OrderDataResponse } from './cartAPI';

export interface CartItem {
    id: number;
    name: string;
    amount: number;
    price: number;
    img: any | null;
    // Add any other properties here as needed
}


export interface CartState {
    cartVisible: boolean;
    shoppingData: CartItem[];
    totalAmount: number;
    totalQuantity: number;
    cartItems: CartItem[];
}

const initialCartState: CartState = {
    cartVisible: false,
    shoppingData: !!localStorage.getItem('shoppingData') ? JSON.parse(localStorage.getItem('shoppingData')!) : [],
    totalAmount: 0,
    totalQuantity: 0,
    cartItems: []
};

interface OrderData {
    user_ID: string;
    paypal_ID: string;
    totalAmount: number;
}

export const sendOrderAsync = createAsyncThunk<OrderDataResponse, OrderData>(
    'cart/addOrder',
    async ({ user_ID, paypal_ID, totalAmount }, thunkAPI) => {
        const state = thunkAPI.getState() as { cart: CartState };
        const sendShoppingData = state.cart.shoppingData;
        const total_price = totalAmount;
        console.log('1');
        
        

        // Transform the shopping data into the required format for order details
        const orderDetails = sendShoppingData.map(item => {
            const price = typeof item.price === 'number' ? item.price : parseFloat(item.price);
            const formattedPrice = !isNaN(price) ? parseFloat(price.toFixed(2)) : 0;
        
            return {
                product: item.id,  // 'id' is the product ID
                quantity: item.amount,
                price_per: formattedPrice
            };
        });

        // Construct the data to be sent to the backend
        const orderData = {
            order_details: orderDetails,
            total_price: total_price,
            user: user_ID,
            paypal_order_id: paypal_ID
        };
        console.log('2');
        try {
            const response = await addOrder(orderData, localStorage.getItem('token'));
            console.log('Order sent successfully:', response.data);
            console.log('3');
            return response.data;
        } catch (error) {
            console.log('4');
            // Handle error
            console.error('Failed to send order:', error);
            throw error;
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        toggleCartVisibility: state => {
            state.cartVisible = !state.cartVisible;
        },
        addItem: (state, action: PayloadAction<CartItem>) => {
            const newItem = action.payload;
            const existingItem = state.shoppingData.find(item => item.id === newItem.id);
            if (existingItem) {
                existingItem.amount += 1;
            } else {
                state.shoppingData.push({ ...newItem, amount: 1, img: newItem.img === null ? '/media/default.jpg' : newItem.img });
            }
            console.log(newItem.img);
            // Save to local storage
            localStorage.setItem('shoppingData', JSON.stringify(state.shoppingData));
            state.totalAmount = state.shoppingData.reduce((acc, curr) => acc + curr.price * curr.amount, 0);
            state.totalQuantity = state.shoppingData.reduce((acc, curr) => acc + curr.amount, 0);
            state.cartItems = state.shoppingData;
            // console.log(state.shoppingData);
        },
        removeItem: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            const itemIndex = state.shoppingData.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
                if (state.shoppingData[itemIndex].amount > 1) {
                    state.shoppingData[itemIndex].amount -= 1; // If quantity is greater than 1, decrement it
                } else {
                    state.shoppingData.splice(itemIndex, 1); // If quantity is 1, remove the item entirely
                }
            }
            // Save to local storage
            localStorage.setItem('shoppingData', JSON.stringify(state.shoppingData));
        },
        removeAllItems: (state, action: PayloadAction<number>) => {
            const id = action.payload;
            // Filter out all items with the specified id
            state.shoppingData = state.shoppingData.filter(item => item.id !== id);
            // Save to local storage
            localStorage.setItem('shoppingData', JSON.stringify(state.shoppingData));
        },
        clearItems: state => {
            state.shoppingData = [];
            // Save to local storage
            localStorage.setItem('shoppingData', JSON.stringify(state.shoppingData));
        },
        updateItemAmount: (state, action: PayloadAction<{ id: number; amount: number }>) => {
            const { id, amount } = action.payload;
            const itemToUpdate = state.shoppingData.find(item => item.id === id);
            if (itemToUpdate) {
                itemToUpdate.amount = amount;
                // Save to local storage
                localStorage.setItem('shoppingData', JSON.stringify(state.shoppingData));
                state.totalAmount = state.shoppingData.reduce((acc, curr) => acc + curr.price * curr.amount, 0);
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(sendOrderAsync.pending, (state, action) => {
            // Handle pending state if needed
            console.log('Sending order is pending...');
        });
        builder.addCase(sendOrderAsync.fulfilled, (state, action) => {
            // Handle fulfilled state if needed
            console.log('Order sent successfully:', action.payload);
        });
        builder.addCase(sendOrderAsync.rejected, (state, action) => {
            // Handle rejected state if needed
            console.error('Failed to send order:', action.error);
        });
    }
});

export const { toggleCartVisibility, addItem, removeItem,removeAllItems, clearItems, updateItemAmount } = cartSlice.actions;
export const selectCartVisibility = (state: { cart: CartState }) => state.cart.cartVisible;
export const selectShoppingData = (state: { cart: CartState }) => state.cart.shoppingData;

export default cartSlice.reducer;
