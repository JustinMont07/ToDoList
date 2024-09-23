import { Text, View, TouchableOpacity } from "react-native";
import { s } from "./AddButton.style";
export function AddButton({ onPress }) {
  return (
    <>
      <TouchableOpacity style={s.button} onPress={() => onPress()}>
        <Text style={s.text}>Add Task +</Text>
      </TouchableOpacity>
    </>
  );
}
