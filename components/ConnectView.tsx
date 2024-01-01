import { Pressable, Text, StyleSheet, View, TextInput, Clipboard } from "react-native";
import { useWeb3Modal } from "@web3modal/wagmi-react-native";
import { useAccount, useSignMessage } from "wagmi";
import React, { useState } from "react";


export default function ConnectView() {
  const { open } = useWeb3Modal();
  const { address, isConnecting, isDisconnected } = useAccount();
  const [message, setMessage] = useState("");
  const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage({
    message: message
  });

  const copyToClipboard = async (content: any) => {
    await Clipboard.setString(content);
  };

  return (
    <>
      {address ? (
        <>
          <Pressable onPress={() => open()} style={styles.button}>
            <Text style={styles.text}>Show Wallet Details</Text>
          </Pressable>
          <TextInput
            placeholder="Enter message to sign"
            style={styles.input}
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          <Pressable
            disabled={isLoading}
            onPress={() => signMessage()}
            style={styles.button}
          >
            <Text style={styles.text}>Sign message</Text>
          </Pressable>
          {isSuccess && (
            <>
              <Text style={styles.textr}>Signature: {data}</Text>
              <Pressable
                onPress={() => copyToClipboard(data)}
                style={styles.button}
              >
                <Text style={styles.text}>Copy Signature</Text>
              </Pressable>
            </>
          )}
          {isError && <Text style={styles.textr}>Error signing message</Text>}
          <Pressable
            onPress={() => copyToClipboard(message)}
            style={styles.button}
          >
            <Text style={styles.text}>Copy Message</Text>
          </Pressable>
          <Pressable
            onPress={() => copyToClipboard(address)}
            style={styles.button}
          >
            <Text style={styles.text}>Copy Address</Text>
          </Pressable>
        </>
      ) : (
        <>
          <Text style={styles.mainText}>Open Connect Modal:</Text>
          <Pressable onPress={() => open()} style={styles.button}>
            <Text style={styles.text}>Connect Wallet!</Text>
          </Pressable>
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    margin: 10,
    paddingHorizontal: 8,
  },
  mainText: {
    // backgroundColor: "black",
    padding: 2,
    borderRadius: 5,
    margin: 2,
    color: "black",
  },
  mainButton: {
    backgroundColor: "black",
    // padding: 10,
    borderRadius: 5,
    // margin:10
  },
  mainButtonText: {
    color: "white",
  },
  secondaryButton: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 5,
    margin: 2,
  },
  secondaryButtonText: {
    color: "white",
    // margin: 5,
  },
  textr: {
    color: "black",
    marginTop: 5,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
    marginTop: 3,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
