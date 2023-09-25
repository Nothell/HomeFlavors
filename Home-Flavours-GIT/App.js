import { StyleSheet, Text, View, Button, Linking, Image } from 'react-native';
import HeaderComponent from './Components/HeaderComponent';
import CategoryCarousel from './Components/CategoryCarousel';
import PopularItems from './Components/PopularItems';
import SearchBar from './Components/SearchBar';


export default function App() {
  return (
    <View style={styles.container}>
      <HeaderComponent />
      <SearchBar/>
      <Image/>
      <CategoryCarousel></CategoryCarousel>
      <PopularItems></PopularItems>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex:1,
    margin:50
  },
});
