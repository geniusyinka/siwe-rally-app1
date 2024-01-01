import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  StatusBar,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import "@walletconnect/react-native-compat";
import { WagmiConfig } from "wagmi";
import { mainnet, polygon, arbitrum } from "viem/chains";
import {
  createWeb3Modal,
  defaultWagmiConfig,
  Web3Modal,
} from "@web3modal/wagmi-react-native";
import Navigation from "./components/Navigation";

import { NavigationContainer } from "@react-navigation/native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Create from "./components/Create";
import Verify2 from "./components/Verify2";
import { useKeyboard } from "@react-native-community/hooks";
import { W3mButton } from "@web3modal/wagmi-react-native";
import { DataProvider, useDataContext } from "./context/DataContext";
import Toast from 'react-native-toast-message'


// 1. Get projectId at https://cloud.walletconnect.com
const projectId = "8c3f5fe8d46b67e7ae566ed05ab15826";

// 2. Create config
const metadata = {
  name: "Web3Modal RN",
  description: "Web3Modal RN Example",
  url: "https://web3modal.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
  redirect: {
    native: "YOUR_APP_SCHEME://",
    universal: "YOUR_APP_UNIVERSAL_LINK.com",
  },
};

const chains = [mainnet, polygon, arbitrum];

const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata });

// 3. Create modal
createWeb3Modal({
  projectId,
  chains,
  wagmiConfig,
});


export default function App() {
  return (
    <DataProvider>
      <WagmiConfig config={wagmiConfig}>
        <Web3Modal />
        <View style={styles.container}>
          <NavigationContainer>
            <View style={styles.container}>
              <Navigation />
              {/* <Create/>
            <Verify2/> */}
              {/* <W3mButton/> */}
              {/* <ConnectView/> */}
            </View>
          </NavigationContainer>
          <Toast />
        </View>
      </WagmiConfig>
    </DataProvider>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    // paddingTop: StatusBar.currentHeight,
    paddingTop: 30,
  },
  scrollView: {
    // backgroundColor: "pink",
    marginHorizontal: 5,
  },
  centerView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    marginTop: 15,
    flexDirection: 'row', // Align items horizontally
    alignItems: 'center', // Center items vertically
  },
  
  textLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: "#999",
    marginBottom: 12,
  },
  textCode: {
    backgroundColor: "#eee",
    fontSize: 16,
    fontFamily: "monospace",
    textAlign: "center",
    padding: 15,
  },
  button: {
    marginBottom: 24,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "black",
    width: "90%",
    borderRadius: 54,
    backgroundColor: "rgba(249, 194, 116, 1)",
  },
  address: {
    flexDirection: 'row', // Ensure content is aligned horizontally
    justifyContent: 'space-between', // Spread items across the available space
    alignItems: 'center', // Align items vertically
    backgroundColor: "#F7F7F7",
    borderRadius: 12,
    width: '90%',
    padding: 10,
    marginBottom: 15
  },
  buttonText: {
    color: "#3E2400",
    fontWeight: "700",
    textAlign: "center", // Center text within the button
    lineHeight: 48, // Adjust as needed
  },
  title: {
    flexDirection: "row", // Arrange items horizontally
    alignItems: "center", // Align items vertically
    marginLeft: 16, // Adjust margin as needed
  },
  titleText: {
    marginLeft: 8, // Adjust margin between icon and text
  },
  deleteButton: {
    padding: 10,
    backgroundColor: "red",
    borderRadius: 5,
    // margin: 'auto',
    height: 50,
  },
  deleteText: {
    color: "white",
    margin: 0,
    textAlign: "center",
    alignContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  textInput2: {
    width: "90%",
    // height: 50,
    borderWidth: 1,
    borderColor: "#F7F7F7",
    backgroundColor: "#F7F7F7",
    paddingHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
    height: 175,
    borderRadius: 12,
  },
});
