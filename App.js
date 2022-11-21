import "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";
import MainNavigator from "./navigations/navigator";
import { StatusBar } from "expo-status-bar";
import { Provider } from "react-redux";
import { store } from "./store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { uuidv4 } from "@firebase/util";
async function storeData(value) {
  try {
    await AsyncStorage.setItem("user_id", value);
  } catch (e) { 
    console.error(e);
  }
}

export async function getData() {
  try {
    const value = await AsyncStorage.getItem("user_id");
    // console.log("AsyncStorage value: ");
    if (value !== null) {
      console.log(value);
      return value
    }else{
      storeData(uuidv4())
      return getData()
    }
    // return value;
  } catch (e) {
    console.error(e);
  }
}

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
