import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { styles } from "../App";
import { useWeb3Modal } from "@web3modal/wagmi-react-native";
import { useAccount, useSignMessage } from "wagmi";
import React, { useState, useEffect } from "react";
import { Entypo, EvilIcons } from "@expo/vector-icons";
import InputBox from "./utils/InputBox";
import { MaterialIcons } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { verifyMessage } from "viem";
import { useDataContext } from "../context/DataContext";
import { useToast } from "react-native-toast-notifications";

import Toast from "react-native-toast-message";

const Verify2 = ({}) => {
  const { open } = useWeb3Modal();
  const { address, isConnecting, isDisconnected } = useAccount();
  // const [message, setMessage] = useState("");
  const { message } = useDataContext();
  const { data } = useDataContext();

  const toast = useToast();

  const { isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: message,
  });

  const [msgSignature, setSignature] = useState(Boolean);
  const wallet_address = address;
  const [verificationResult, setVerificationResult] = useState(null); // State to hold verification result

  const veryfyMsg = async () => {
    if (data) {
      console.log("verifying...");
      const valid = await verifyMessage({
        address: address,
        message: message,
        signature: data,
      });
      console.log("Verification result:", valid);
      setVerificationResult(valid);
      showToast();
    } else {
      console.log("unverified message...");
    }
  };
  const truncatedAddress = address ? address.slice(0, 25) : "";

  const showToast = () => {
    Toast.show({
      type: "success",
      text2: "Message & Signature Verified! ✅",
      position: "bottom",
    });
  };

  return (
    // <SafeAreaView>
    <>
      <ScrollView>
        <View style={styles.centerView}>
          <Text
            style={[
              styles.header,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <FontAwesome name="check-square" size={24} color="black" /> Verify
            Message
          </Text>
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
              <View style={styles.address}>
                <Text>
                  <Entypo name="wallet" size={14} color="black" />
                  {truncatedAddress}...
                </Text>
                <Pressable onPress={() => open()}>
                  <Ionicons name="md-exit-outline" size={24} color="black" />
                </Pressable>
              </View>
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
            editable={false}
            // onChangeText={(text) => setMessage(text)}
          />
        </View>
        <View style={styles.title}>
          <EvilIcons name="pencil" size={19} color="black" />
          <Text style={styles.titleText}>Signature</Text>
        </View>
        <View style={styles.centerView}>
          <InputBox placeholder="Signature" value={data} editable={false} />

          <Pressable
            disabled={isLoading}
            onPress={veryfyMsg}
            style={styles.button}
          >
            <View style={styles.title}>
              <MaterialIcons name="check-box" size={18} color="black" />
              <Text style={styles.buttonText}>Verify Signature</Text>
            </View>
          </Pressable>
          {/* <Button title="Show toast" onPress={showToast} /> */}
        </View>
        {/* <View style={styles.title}>
          <Text>Verification result:</Text>
          {verificationResult === true && (
            <Text>Message & Signature valid!</Text>
          )}
          {verificationResult === false && (
            <Text>Message & Signature Invalid!</Text>
          )}
          {verificationResult === null && <Text>Verifying message...</Text>}
        </View> */}

        {/* </KeyboardAvoidingView> */}
      </ScrollView>
    </>
    // </SafeAreaView>
  );
};

export default Verify2;
