import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  TextInput,
} from "react-native";
import { styles } from "../App";
import { useWeb3Modal } from "@web3modal/wagmi-react-native";
import { useAccount, useSignMessage } from "wagmi";
import { verifyMessage } from "viem";
import { Entypo, EvilIcons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import InputBox from "./utils/InputBox";

const Verify = () => {
  const { open } = useWeb3Modal();
  const { address, isConnecting, isDisconnected } = useAccount();
  const [message, setMessage] = useState("");
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
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
    } else {
      console.log("unverified message...");
    }
  };

  // const veryfyMsg = async (): Promise<boolean> => {
  //   if (data) {
  //     console.log("verifying...");
  //     try {
  //       const valid = await verifyMessage({
  //         address: address,
  //         message: "message",
  //         signature: data,
  //       });

  //       // Log the value of 'valid'
  //       console.log("Verification result:", valid);

  //       // If verification is successful, return true
  //       return valid;
  //       setSignature(valid);
  //     } catch (error) {
  //       console.error("Verification failed:", error);
  //       // If verification fails, return false
  //       return false;
  //     }
  //   } else {
  //     console.log("unverified message...");
  //     // If 'data' is not available, return false or handle as needed
  //     return false;
  //   }
  // };

  // useEffect(() => {
  //   const veryfyMsg = async () => {
  //     // Your verification logic here, assuming `data`, `address`, and `message` are accessible
  //     if (data) {
  //       try {
  //         const valid = await verifyMessage({
  //           address: address,
  //           message: message,
  //           signature: data,
  //         });

  //         // Update the state with the verification result
  //         setVerificationResult(valid);
  //       } catch (error) {
  //         console.error("Verification failed:", error);
  //         // Update the state indicating verification failure
  //         setVerificationResult(false);
  //       }
  //     } else {
  //       console.log("unverified message...");
  //       // Update the state if 'data' is not available
  //       setVerificationResult(false);
  //     }
  //   };

  //   veryfyMsg();
  // }, []);

  // if (data) {
  //   const valid = await verifyMessage({
  //     address: address,
  //     message: message,
  //     signature: data,
  //   });
  // } else {
  //   console.log("unverified message...");
  // }

  return (
    <>
      <View style={styles.centerView}>
        <Text style={styles.header}>Verify Message</Text>
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

            </View>
            <Pressable onPress={() => open()} style={styles.button}>
              <Text
                style={{ color: "#3E2400", lineHeight: 48, fontWeight: "500" }}
              >
                Connect Wallet!
              </Text>
            </Pressable>
          </>
        ) : (
          <>
            <Pressable onPress={() => open()} style={styles.button}>
              <Text
                style={{ color: "#3E2400", lineHeight: 48, fontWeight: "500" }}
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
        {/* <InputBox
          placeholder="Enter message to sign"
          value={message}
          onChangeText={(text) => setMessage(text)}
        /> */}
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
        {/* <InputBox
          placeholder="Signature"
          value={data}
          editable={false}
        /> */}
      </View>
      {/* <Text>{data}</Text> */}
      <View style={styles.centerView}>
        <Pressable
          disabled={isLoading}
          onPress={veryfyMsg}
          style={styles.button}
        >
          <View style={styles.title}>
            <MaterialIcons name="check-box" size={18} color="black" />
            <Text style={styles.buttonText}>Verify Message</Text>
          </View>
        </Pressable>
      </View>
      <View style={styles.title}>
        <Text>Verification result:</Text>
        {verificationResult === true && <Text>Message & Signature valid!</Text>}
        {verificationResult === false && (
          <Text>Message & Signature Invalid!</Text>
        )}
        {/* {verificationResult === null && <Text>Verifying message...</Text>} */}
      </View>
    </>
  );
};

export default Verify;
