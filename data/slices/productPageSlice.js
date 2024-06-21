import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  storeName: "Dengon",
  loading: false,
  announcement: "",
  menus: [
    {
      "name":"Woman",
      "link":""
    },
    {
      "name":"Kids",
      "link":""
    },
    {
      "name":"Man",
      "link":""
    },
    {
      "name":"Home",
      "link":""
    },
    {
      "name":"Curve+",
      "link":""
    },
    {
      "name":"Shoe",
      "link":""
    }
  ],
  images: [
    {
      src: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      href: "",
      alt: ""
    },
    {
      src: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      href: "",
      alt: ""
    },
    {
      src: "https://images.unsplash.com/photo-1485125639709-a60c3a500bf1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      href: "",
      alt: ""
    }
  ],
  wishlist: [],
 product: null,
 selectedVariant: null
}

export const productPageSlice = createSlice({
  name: 'productPageData',
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state.product = action.payload
    },
    setSelectedVariant: (state, action) => {
      state.selectedVariant = action.payload;
    },
    addToWishlist: (state, action) => {
      state.wishlist = [action.payload, ...state.wishlist];

    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((item) => item !== action.payload);
    
    },
    initWishlist: (state, action) => {
      state.wishlist = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})


export const { setProduct, setSelectedVariant, addToWishlist, removeFromWishlist, initWishlist, setLoading } = productPageSlice.actions;
const producPageReducer = productPageSlice?.reducer;
export default producPageReducer;