import { ScrollView, Text, View, Alert } from "react-native";
import { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import Dialog from "react-native-dialog";
import { Header } from "./components/Header/Header";
import { Card } from "./components/Card/Card";
import { Footer } from "./components/Footer/Footer";
import { AddButton } from "./components/AddButton/AddButton";
import uuid from "react-native-uuid";

export default function App() {
  //State variables
  const [toDoList, setToDoList] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");

  //Filters the list of tasks based on the selected tab
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

  //Deletes a task from the list
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

  //Renders the list of tasks
  function renderToDoList() {
    return getFilteredToDoList().map((todo) => (
      <View key={todo.id} style={s.cardItem}>
        <Card onLongPress={deleteTodo} onPress={updateToDoList} todo={todo} />
      </View>
    ));
  }

  //Updates the list
  function updateToDoList(todo) {
    const updatedToDo = { ...todo, done: !todo.done };
    const updatedList = [...toDoList];
    const indexToUpdate = updatedList.findIndex((t) => t.id === updatedToDo.id);
    updatedList[indexToUpdate] = updatedToDo;
    setToDoList(updatedList);
  }

  //Adds a new task to the list
  function addToDo() {
    const newTodo = {
      id: uuid.v4(),
      title: inputValue,
      done: false,
    };
    setToDoList([...toDoList, newTodo]);
    setIsDialogVisible(false);
    setInputValue("");
  }

  //Shows the dialog box to add a new task
  function renderAddDialog() {
    return (
      <Dialog.Container
        visible={isDialogVisible}
        onBackdropPress={() => setIsDialogVisible(false)}
      >
        <Dialog.Title>Add A New Task</Dialog.Title>
        <Dialog.Input
          onChangeText={(text) => setInputValue(text)}
          placeholder="Type task here"
        />
        <Dialog.Button
          label="Cancel"
          color="darkgrey"
          onPress={() => setIsDialogVisible(false)}
        />
        <Dialog.Button
          disabled={inputValue.length === 0}
          label="Add"
          onPress={addToDo}
        />
      </Dialog.Container>
    );
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
          <AddButton onPress={() => setIsDialogVisible(true)} />
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <Footer
          toDoList={toDoList}
          onPress={setSelectedTab}
          selectedTab={selectedTab}
        />
      </View>

      {renderAddDialog()}
    </>
  );
}
