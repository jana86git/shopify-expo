import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  storeName: "Dengon",
  announcement: "",
  fetchingData: false,
  menus: [
    {
      "name":"Home",
      "link":""
    },
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
  contentToFetch:{
    "collections": [ "gid://shopify/Collection/432301998319", "gid://shopify/Collection/432302063855", "gid://shopify/Collection/432302129391","gid://shopify/Collection/432302162159","gid://shopify/Collection/432302194927","gid://shopify/Collection/432302096623"],
    "onSale": ["gid://shopify/Product/8548707205359","gid://shopify/Product/8548707270895","gid://shopify/Product/8548707369199","gid://shopify/Product/8548707729647", "gid://shopify/Product/8548707795183"],
    "popularProducts":["gid://shopify/Product/8548712448239","gid://shopify/Product/8548712481007", "gid://shopify/Product/8548712513775","gid://shopify/Product/8548712546543","gid://shopify/Product/8548712743151","gid://shopify/Product/8548712808687","gid://shopify/Product/8548712874223","gid://shopify/Product/8548712906991"]
    },
    content : {},
    activePage: "Home"
}

export const homePageSlice = createSlice({
  name: 'homePageData',
  initialState,
  reducers: {
    setContent: (state, action) => {
      state.content = action.payload
    },
    setFetchingData: (state, action) => {
      state.fetchingData = action.payload
    },
    setActivePage: (state, action) => {
      state.activePage = action.payload
    }
  }
})


export const { setContent, setFetchingData, setActivePage } = homePageSlice.actions;
const homePageReducer = homePageSlice?.reducer;
export default homePageReducer;