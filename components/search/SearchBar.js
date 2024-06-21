import { View, TextInput } from "react-native"
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { style } from "./search_bar_style";
import { router } from "expo-router";
import { useEffect, useState,  useRef } from "react";
import { useSegments } from "expo-router";

import { useDispatch, useSelector } from "react-redux";
import { setQuery,setProducts } from "../../data/slices/searchPageSlice";

export default function SearchBar() {
    const dispatch = useDispatch();
    const {query}  = useSelector(state => state.searchPageData);

    function setText(text){
        dispatch(setQuery(text));
    }

    const segments = useSegments();
    const inputRef = useRef(null);
    const [activePage, setActivePage] = useState("");
   
  

    useEffect(()=>{
        console.log("segments", segments);
      setActivePage(segments[1]);
    },[segments])

    useEffect(()=>{
        console.log("activePage", activePage, activePage === "search");
        if(activePage === "search"){
            inputRef.current?.focus();
        } 

        if(activePage === "home"){
            dispatch(setQuery(""));
            dispatch(setProducts(""));
        }
      
    },[inputRef,activePage])

   
    return (
        <View style={style.wrapper}>
            <View style={style.icon_wrapper}>
                <EvilIcons name="search" size={30} color="black" />
            </View>
            <View style={style.input_wrapper}>
                <TextInput ref={inputRef} onFocus={() => {if(activePage === "home"){router.navigate("/screens/search")} }} placeholder="Search" style={style.input} value={query} onChangeText={setText} />
            </View>


        </View>
    )
}