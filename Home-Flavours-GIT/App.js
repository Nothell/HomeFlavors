import React, { useEffect, useState } from 'react';
import { StatusBar, View } from 'react-native';
import SplashScreen from './Screens/SplashScreen';

const App = () => {
  const [isAppReady, setAppReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAppReady(true);
    }, 3000); 

  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isAppReady ? (
        <>
          <StatusBar style="auto" />
        </>
      ) : (
        <SplashScreen />
      )}
    </View>
  );
};

export default App;
