import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  TextInput,
} from "react-native";
import { styles } from "../../App";

const InputBox = (props: any) => {
  const { placeholder, style, value, onChangeText, editable } = props;

  return (
    <>
      <TextInput
        placeholder={placeholder}
        style={[styles.textInput2]} // Merge default and custom styles
        value={value}
        onChangeText={onChangeText}
        multiline={true}
        textAlignVertical="top"
        editable={editable}

      />
    </>
  );
};


export default InputBox;