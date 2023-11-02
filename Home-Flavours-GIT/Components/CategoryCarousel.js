import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from "react-native";
import ItemGrid from './ItemGrid';
import DishDataGrid from "./DishDataGrid";
import { useNavigation } from '@react-navigation/native';
import DishCategoryCarousel from './DishCategoryCarousel';
import SearchBar from './SearchBar';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where, orderBy} from "firebase/firestore";

import { createStackNavigator } from '@react-navigation/stack';

export default function CategoryCarousel() {
    const [items, setItems] = useState([]);
    const [popularItems, setPopularItems] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        getCategoriesList();
        getPopularList();
        const interval = setInterval(getPopularList, 3000);
        return () => clearInterval(interval);
    }, []);

    const getPopularList = async () => {
        try {
            const q = query(collection(db, "popularItems"));

            const querySnapshot = await getDocs(q);

            let myPopularList = [];

            querySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());

                myPopularList.push({
                    id: doc.id,                 
                    image: doc.data().image,
                    name: doc.data().name
                })
            });
            console.log(myPopularList)
            setPopularItems(myPopularList);

        } catch (err) {
            console.log(err)
        }
    }

     const getCategoriesList = async () => {
        try {
            // const userId = auth.currentUser?.uid;
            // if (!userId) {
            //     console.log('User not authenticated.');
            //     return;
            // }

            const q = query(collection(db, "categories"), orderBy("categoryId"));

            const querySnapshot = await getDocs(q);

            let myCategoryList = [];

            querySnapshot.forEach((doc) => {
                // console.log(doc.id, " => ", doc.data());

                myCategoryList.push({
                    id: doc.id,
                    desc: doc.data().desc,
                    image: doc.data().image,
                    name: doc.data().name
                })
            });
            console.log(myCategoryList)
            setItems(myCategoryList);

        } catch (err) {
            console.log(err)
        }
    }
    const handleItemClick = (item) => {
        // Alert.alert('Item Clicked', `You clicked on ${item.title}`);
        navigation.navigate('Category', { item });
    };
    return (
        <View style={styles.container}>
            <SearchBar />
            <ItemGrid items={items} onItemClick={handleItemClick} />
            <DishDataGrid data={popularItems} onItemClick={handleItemClick} />
        </View>

    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    }
})