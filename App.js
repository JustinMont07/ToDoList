import { ScrollView, Text, View, Alert } from "react-native";
import { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import { Header } from "./components/Header/Header";
import { Card } from "./components/Card/Card";
import { Footer } from "./components/Footer/Footer";
export default function App() {
  const [toDoList, setToDoList] = useState([
    { id: 1, title: "Buy milk", done: true },
    { id: 2, title: "Call mom", done: false },
    { id: 3, title: "Go to the gym", done: true },
    { id: 4, title: "Buy milk", done: true },
    { id: 5, title: "Call mom", done: false },
    { id: 6, title: "Go to the gym", done: true },
    { id: 7, title: "Buy milk", done: true },
    { id: 8, title: "Call mom", done: false },
    { id: 9, title: "Go to the gym", done: true },
  ]);

  const [selectedTab, setSelectedTab] = useState("All");

  function getFilteredToDoList() {
    switch (selectedTab) {
      case "Active":
        return toDoList.filter((todo) => !todo.done);
      case "Completed":
        return toDoList.filter((todo) => todo.done);
      default:
        return toDoList;
    }
  }
  function deleteTodo(todoToDelete) {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const updatedList = toDoList.filter((t) => t.id !== todoToDelete.id);
          setToDoList(updatedList);
        },
      },
      { text: "Cancel", style: "cancel" },
    ]);
  }

  function renderToDoList() {
    return getFilteredToDoList().map((todo) => (
      <View key={todo.id} style={s.cardItem}>
        <Card onLongPress={deleteTodo} onPress={updateToDoList} todo={todo} />
      </View>
    ));
  }

  function updateToDoList(todo) {
    const updatedToDo = { ...todo, done: !todo.done };
    const updatedList = [...toDoList];
    const indexToUpdate = updatedList.findIndex((t) => t.id === updatedToDo.id);
    updatedList[indexToUpdate] = updatedToDo;
    setToDoList(updatedList);
  }

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>

          <View style={s.body}>
            <ScrollView>{renderToDoList()}</ScrollView>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <Footer
          toDoList={toDoList}
          onPress={setSelectedTab}
          selectedTab={selectedTab}
        />
      </View>
    </>
  );
}
