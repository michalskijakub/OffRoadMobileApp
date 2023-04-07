import {useCallback, useRef} from "react";
import { NativeBaseProvider } from "native-base";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import AppNavigation from "./src/navigation/AppNavigation";

import customTheme from "./src/customTheme";

const App = () => {
  const navigationRef = useRef(null);
    const [fontsLoaded] = useFonts({
        'Lato': require('./assets/Lato/Lato-Regular.ttf'),
        'Lato-Bold': require('./assets/Lato/Lato-Bold.ttf')
    });

    // ogólnie nie mam pojęcia co tu się dzieje, ale z tego co rozumiem to dzięki temu callbackowi czekamy z ładowaniem
    // apki aż się załaduje czcionka
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

  return (
    <NativeBaseProvider theme={customTheme}>
      <AppNavigation navigationRef={navigationRef} />
    </NativeBaseProvider>
  );
};

export default App;
