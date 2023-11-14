import { StyleSheet, View, Text, Image, Button } from "react-native";

export default function ProductLists() {
    const localImageSource = require('../assets/basanti.jpg');
    return (
        <View style = {styles.container}>
            <View style = {styles.listItem}>
            <View style= {styles.textContainer}>
                <Text>Bastani Sonnati</Text>
                <Text> Want a delicious meal but no time we will deliver it hot and yummy</Text>
                <Text>$7.50</Text>
            </View>
            <View>
                <Image source={localImageSource} style={styles.image}></Image>
                <Button title="Add">Add</Button>
            </View>
            </View>
            <View style = {styles.listItem}>
            <View style= {styles.textContainer}>
                <Text>Bastani Sonnati</Text>
                <Text> Want a delicious meal but no time we will deliver it hot and yummy</Text>
                <Text>$7.50</Text>
            </View>
            <View>
                <Image source={localImageSource} style={styles.image}></Image>
                <Button title="Add">Add</Button>
            </View>
            </View>
            <View style = {styles.listItem}>
            <View style= {styles.textContainer}>
                <Text>Bastani Sonnati</Text>
                <Text> Want a delicious meal but no time we will deliver it hot and yummy</Text>
                <Text>$7.50</Text>
            </View>
            <View>
                <Image source={localImageSource} style={styles.image}></Image>
                <Button title="Add">Add</Button>
            </View>
            </View>
            <View style = {styles.listItem}>
            <View style= {styles.textContainer}>
                <Text>Bastani Sonnati</Text>
                <Text> Want a delicious meal but no time we will deliver it hot and yummy</Text>
                <Text>$7.50</Text>
            </View>
            <View>
                <Image source={localImageSource} style={styles.image}></Image>
                <Button title="Add">Add</Button>
            </View>
            </View>  
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 5
      },
    listItem: {
        flexDirection: "row",
        borderRadius: 10,
        borderWidth: 1,
        overflow: 'hidden',
        maxWidth: 400,
        margin: 15,
        height: '30%'
    },
    imageButtonContainer: {
        flex:1,
        padding:5
    },
    image: {
        width: '100%', // Ensure the image takes up the entire width of its container
        height: '100%', // Ensure the image takes up the entire height of its container
      },
    textContainer: {
        flex: 1,
        padding: 10,
    }
})
