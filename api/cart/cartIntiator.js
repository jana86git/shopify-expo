import { cartFetch } from "./cartFetch";
import { setCartCount, setCartItems, setCartId } from "../../data/slices/cartPageSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';
export async function cartInitiator( dispatch) {
    let cartId = await AsyncStorage.getItem('cart-id');
    
    if (cartId) {
        let data = await cartFetch(cartId);
        dispatch(setCartCount(data?.data?.cart?.totalQuantity));
        dispatch(setCartId(cartId));
    } else {
        dispatch(setCartCount(0));
        dispatch(setCartId(null));
    }
}