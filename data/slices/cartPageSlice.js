import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  storeName: "Dengon",
  addingToCart: false,
  cartCount: 0,
  cartLines: [],
  cartID: null,
  cartData: null,
  totalAmount: [],
  totalTaxAmount: [],
  subtotalAmount: [],
  checkoutURL : [],
  totalQuantity : 0,
  currencyCode: null,
  fetchingCart: true,
  updatingLine: false
}

export const cartPageSlice = createSlice({
  name: 'homePageData',
  initialState,
  reducers: {
    setAddingToCart: (state, action) => {
      state.addingToCart = action.payload
    },
    setCartCount: (state, action) => {
      state.cartCount = action.payload
    },
    setCartId: (state, action) => {
      state.cartID = action.payload
    },
    setCartData: (state, action) => {
      state.cartData = action.payload
    },
    setCartLines: (state, action) => {
      state.cartLines = action.payload
    },
    setTotalAmount: (state, action) => {
      state.totalAmount = action.payload
    },
    setCartLines: (state, action) => {
      state.cartLines = action.payload
    },
    setTotalTaxAmount: (state, action) => {
      state.totalTaxAmount = action.payload
    },
    setSubtotalAmount: (state, action) => {
      state.subtotalAmount = action.payload
    },
    setCheckoutURL : (state, action) => {
      state.checkoutURL = action.payload
    },
    setTotalQuantity : (state, action) => {
      state.totalQuantity = action.payload
    },
    setCurrencyCode : (state, action) => {
      state.currencyCode = action.payload
    },
    setFetchingCart: (state, action) => {
      state.fetchingCart = action.payload
    },
    setUpdatingLine: (state, action) => {
      state.updatingLine = action.payload
    },
    resetState: (state) => {
      state.cartID = null
      state.cartData = null
      state.cartCount = 0
      state.totalAmount = []
      state.totalTaxAmount = []
      state.subtotalAmount = []
      state.checkoutURL = []
      state.totalQuantity = 0
      state.currencyCode = null
    }
  }
})


export const { setAddingToCart, setCartCount, setCartId, setFetchingCart, setUpdatingLine, setCartData, setCheckoutURL, setTotalAmount, setTotalTaxAmount, setSubtotalAmount, setTotalQuantity, setCurrencyCode,setCartLines } = cartPageSlice.actions;
const cartPageReducer = cartPageSlice?.reducer;
export default cartPageReducer;