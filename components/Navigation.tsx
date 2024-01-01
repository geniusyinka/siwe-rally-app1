// Navigation.js
import Create from "./Create";
// import Verify from "./Verify";
import { NavigationContainer } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  TextInput,
  SafeAreaView,
} from "react-native";
import { useWeb3Modal } from "@web3modal/wagmi-react-native";
import { useAccount, useSignMessage } from "wagmi";
import React, { useState } from "react";
import { Entypo, EvilIcons } from "@expo/vector-icons";
import InputBox from "./utils/InputBox";
import { styles } from "../App";
import Verify from "./Verify";

import Verify2 from "./Verify2";

// const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

function Home() {
  const { open } = useWeb3Modal();
  const { address, isConnecting, isDisconnected } = useAccount();
  const [message, setMessage] = useState("");
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: message,
  });
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <View style={styles.centerView}>
        <Text style={styles.header}>Create Signature</Text>
        {!address ? (
          <>
            <View
              style={{
                borderRadius: 84,
                overflow: "hidden",
                margin: 5,
                width: "90%",
              }}
            >
              <Text style={styles.textCode}>
                Connect Wallet To Unlock Fields
              </Text>
            </View>
            <Pressable onPress={() => open()} style={styles.button}>
              <Text style={styles.buttonText}>
                <Entypo name="wallet" size={14} color="black" />
                Connect Wallet
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable onPress={() => open()} style={styles.button}>
              <Text
                style={{
                  color: "#3E2400",
                  lineHeight: 48,
                  fontWeight: "500",
                }}
              >
                addy...
              </Text>
            </Pressable>
          </>
        )}
      </View>
      <View style={styles.title}>
        <Entypo name="mail" size={19} color="black" />
        <Text style={styles.titleText}>Message</Text>
      </View>
      <View style={styles.centerView}>
        <InputBox
          placeholder="Enter message to sign"
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <Pressable
          disabled={isLoading}
          onPress={() => signMessage()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            <EvilIcons name="pencil" size={19} color="black" />
            Generate Signature
          </Text>
        </Pressable>
      </View>
      <View style={styles.title}>
        <EvilIcons name="pencil" size={19} color="black" />
        <Text style={styles.titleText}>Signature</Text>
      </View>
      <View style={styles.centerView}>
        <InputBox
          placeholder="Enter message to sign"
          value={data}
          editable={false}
        />
      </View>
    </View>
  );
}

function House2() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <Create />
    </View>
  );
}

function House() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red",
      }}
    >
      <Verify />
    </View>
  );
}

const Navigation = () => {
  //   const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="Sign In"
      tabBarOption={{
        activeTintColor: "red",
        labelStyle: { fontSize: 12 },
        style: { backgroundColor: "red" },
      }}
    >
      <Tab.Screen
        name="Create"
        component={Create}
        options={{ tabBarLabel: "Create" }}
      />
      <Tab.Screen
        name="Verify"
        component={Verify2}
        options={{ tabBarLabel: "Verify" }}
      />
    </Tab.Navigator>
  );
};
export default Navigation;
