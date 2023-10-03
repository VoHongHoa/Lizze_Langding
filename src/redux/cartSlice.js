import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  total: 0,
  totalQuantity: 0,
  promotion: [],
};
export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const newProduct = action.payload;
      const foundProduct = state.products.find(
        (item) => item.productCode === newProduct.productCode
      );
      if (!!foundProduct) {
        foundProduct.quantity = foundProduct.quantity + 1;
      } else {
        state.products.push({ ...newProduct, quantity: 1 });
      }
      state.total = state.total + parseInt(newProduct.price);
      state.totalQuantity = state.totalQuantity + 1;
    },
    removeFromcart: (state, action) => {
      const removeProduct = action.payload;
      state.products = state.products.filter(function (item) {
        return item.productCode !== removeProduct.productCode;
      });
      state.total -= parseInt(removeProduct.price * removeProduct.quantity);
      state.totalQuantity -= removeProduct.quantity;
    },
    increaseQuantity: (state, action) => {
      const changeProduct = action.payload;
      const foundProduct = state.products.find(
        (item) => item.productCode === changeProduct.productCode
      );
      foundProduct.quantity += 1;
      state.total += parseInt(foundProduct.price);
      state.totalQuantity += 1;
    },
    decreaseQuantity: (state, action) => {
      const changeProduct = action.payload;
      const foundProduct = state.products.find(
        (item) => item.productCode === changeProduct.productCode
      );
      if (foundProduct.quantity === 1) {
        state.products = state.products.filter(function (item) {
          return item.productCode !== foundProduct.productCode;
        });
      } else {
        foundProduct.quantity -= 1;
      }
      state.total -= parseInt(foundProduct.price);
      state.totalQuantity -= 1;
    },
    changeQuantity: (state, action) => {
      const changeProduct = action.payload;
      const foundProduct = state.products.find(
        (item) => item.productCode === changeProduct.productCode
      );
      const oldQuantity = foundProduct.quantity;
      foundProduct.quantity = changeProduct.quantity;
      state.total += parseInt(
        foundProduct.price * (changeProduct.quantity - oldQuantity)
      );
      state.totalQuantity += changeProduct.quantity - oldQuantity;
    },
    clearCart: (state, action) => {
      state = initialState;
    },
  },
});
export const {
  addToCart,
  removeFromcart,
  changeQuantity,
  decreaseQuantity,
  increaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
