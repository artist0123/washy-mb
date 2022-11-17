import "react-native-gesture-handler";
import { styled } from "nativewind";
import { NativeBaseProvider } from "native-base";
import MainNavigator from "./navigations/navigator";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./store/store";

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <MainNavigator></MainNavigator>
        <StatusBar />
      </NativeBaseProvider>
    </Provider>
  );
}
