import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    query: "",
    products: [],
    loading: false
}

export const searchPageSlice = createSlice({
  name: 'searchPageData',
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload
    },
    setProducts: (state, action) => {
      state.products = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    }
  }
})


export const { setQuery, setProducts, setLoading } = searchPageSlice.actions;
const searchPageReducer = searchPageSlice?.reducer;
export default searchPageReducer;