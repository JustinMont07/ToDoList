import { s } from "./Footer.style";
import { Text, View, TouchableOpacity } from "react-native";
export function Footer({ toDoList, selectedTab, onPress }) {
  const countByStatus = toDoList.reduce(() => {
    return {
      All: toDoList.length,
      Active: toDoList.filter((todo) => !todo.done).length,
      Completed: toDoList.filter((todo) => todo.done).length,
    };
  }, {});

  function getTextStyle(tabName) {
    return {
      color: selectedTab === tabName ? "#2F76E5" : "black",
      fontSize: 16,
      fontWeight: "bold",
    };
  }
  return (
    <>
      <View style={s.root}>
        <TouchableOpacity style={s.button} onPress={() => onPress("All")}>
          <Text style={getTextStyle("All")}>All ({countByStatus.All})</Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.button} onPress={() => onPress("Active")}>
          <Text style={getTextStyle("Active")}>
            Active ({countByStatus.Active})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={s.button} onPress={() => onPress("Completed")}>
          <Text style={getTextStyle("Completed")}>
            Completed ({countByStatus.Completed})
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
