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
  ViewStyle,
  TouchableOpacity,
  Animated,
  Dimensions,
} from "react-native";
import { useWeb3Modal } from "@web3modal/wagmi-react-native";
import { useAccount, useSignMessage } from "wagmi";
import React, { useState } from "react";
import { Entypo, EvilIcons } from "@expo/vector-icons";
import InputBox from "./utils/InputBox";
import { styles } from "../App";
import Verify from "./Verify";
import Verify2 from "./Verify2";
import { FontAwesome } from "@expo/vector-icons";

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
const screenOptions = ({ route }) => ({
  tabBarShowLabel: true,
  tabBarLabelStyle: {
    // backgroundColor: route.state && route.state.index === route.key ? 'blue' : 'transparent',
  },
  headerShown: false,
  fontSize: 30,

  tabBarStyle: {
    position: "relative",
    activeTintColor: "red",
    padding: 20,
    borderWidth: 0,
    borderRadius: 8,
    margin: 20,
    color: "red",
    elevation: 0,
    height: 100,
    // backgroundColor:
    //   route.state && route.state.index === route.key ? "blue" : "red",
    // // fontSize: 30,
  },
});

const Navigation = () => {
  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen
        name="Create"
        component={Create}
        options={{ tabBarLabel: '⭐️ Create' }}
      />
      <Tab.Screen
        name="Verify"
        component={Verify2}
        options={{ tabBarLabel: '✅ Verify' }}
      />
    </Tab.Navigator>
  );
};

const CustomTabBar = ({ state, descriptors, navigation, position }) => {
  const inputRange = state.routes.map((_, index) => index);
  const { width } = Dimensions.get('window');

  const translateX = Animated.multiply(position, width / state.routes.length);

  return (
    <View style={{ flexDirection: 'row', backgroundColor: 'lightgrey', borderRadius: 42, margin: 10 }}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const tabBarStyle = {
          // backgroundColor: isFocused ? 'white' : 'lightgrey',
          borderRadius: 12,
          zIndex: 1,
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          marginHorizontal: 8,
          height: 50,
          // backgroundColor: 'red',
        };

        return (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate(route.name)}
            style={tabBarStyle}
          >
            <Text style={{ color: isFocused ? 'black' : 'black' }}>
              {descriptors[route.key].options.tabBarLabel}
            </Text>
          </TouchableOpacity>
        );
      })}
      <Animated.View
        style={[
          istyles.tabIndicator,
          {
            width: `${100 / state.routes.length}%`,
            transform: [{ translateX }],
          },
        ]}
      />
    </View>
  );
};
const istyles = StyleSheet.create({
  tabBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingVertical: 12,
    borderRadius: 12,
    marginHorizontal: 8,
    padding: 20,
    backgroundColor: 'red'
  },
  tabIndicator: {
    position: 'absolute',
    bottom: 0,
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 42,
  },
});

export default Navigation;