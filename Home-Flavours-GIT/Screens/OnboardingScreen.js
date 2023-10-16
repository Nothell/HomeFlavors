import React from 'react';
import { View, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import SignInComponent from '../Components/SignInComponent';
import SignUpComponent from '../Components/SignUpComponent';
import EnterpreneurComponent from '../Components/EnterpreneurComponent';

const OnboardingScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Swiper>
        <View>
          <SignUpComponent navigation={navigation} />
        </View>
        <View>
          <SignInComponent navigation={navigation} />
        </View>
        <View>
          <EnterpreneurComponent />
        </View>
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});

export default OnboardingScreen;
