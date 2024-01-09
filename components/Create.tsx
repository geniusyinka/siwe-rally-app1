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
import { useDataContext } from "../context/DataContext";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";


// import { useDataContext } from './DataContext'; // Import the context

const Create = ({}) => {
  const { open } = useWeb3Modal();
  const { address, isConnecting, isDisconnected } = useAccount();
  const { message, updateMessage, updateData } = useDataContext();

  // const [message, setMessage] = useState("");
  // const { message, setMessage } = useDataContext();

  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: message,
  });

  const handleMessageChange = (text: string) => {
    updateMessage(text); // This will update the message value in the context
  };
  useEffect(() => {
    if (data) {
      updateData(data);
    }
  }, [data, updateData]);

  useEffect(() => {
    // Perform actions when 'message' changes
    console.log("Message changed:", message);
    // You can add more logic here
  }, [message]);

  const truncatedAddress = address ? address.slice(0, 25) : "";

  return (
    <View style={styles.body}>
      <ScrollView>
        <View style={styles.centerView}>
          <Text style={styles.header}>
            <AntDesign name="star" size={24} color="black" />
            Create Signature
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
            editable={true}
            onChangeText={handleMessageChange}
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
          <InputBox placeholder="Signature" value={data} editable={false} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Create;
