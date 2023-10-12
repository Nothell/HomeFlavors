import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from "react-native";
import ItemGrid from './ItemGrid';
import DishDataGrid from "./DishDataGrid";
import { useNavigation } from '@react-navigation/native';
import DishCategoryCarousel from './DishCategoryCarousel';
import SearchBar from './SearchBar';
import { db } from '../firebaseConfig';
import { collection, getDocs, query, where, orderBy} from "firebase/firestore";
export default function CategoryCarousel() {
    const [items, setItems] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {

        getCategoriesList();
        const interval = setInterval(getCategoriesList, 3000);
        return () => clearInterval(interval);
    }, []);

    const imageData = [
        { id: 1, imageUrl: 'https://www.foodiesfeed.com/wp-content/uploads/2023/10/mediterranean-chickpea-salad.jpg', text: 'Item 1' },
        { id: 2, imageUrl: 'https://www.foodiesfeed.com/wp-content/uploads/2023/06/plate-of-noodles-with-shrimps.jpg', text: 'Item 2' },
        { id: 3, imageUrl: 'https://www.foodiesfeed.com/wp-content/uploads/2023/04/grilled-snapper-fish-with-lemon.jpg', text: 'Item 3' },
        // Add more items as needed
    ];

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
        navigation.navigate('DishCategoryCarousel', { item });
    };
    return (
        <View style={styles.container}>
            <SearchBar />
            <ItemGrid items={items} onItemClick={handleItemClick} />
            <DishDataGrid data={imageData} onItemClick={handleItemClick} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'light-blue'
    }
})