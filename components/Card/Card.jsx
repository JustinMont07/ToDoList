import { s } from "./Card.style.js";
import { TouchableOpacity, Text, Image } from "react-native";
import check from "../../assets/check.png";
export function Card({ todo, onPress }) {
  return (
    <>
      <TouchableOpacity style={s.card} onPress={() => onPress(todo)}>
        <Text
          style={[
            s.cardtext,
            todo.done && { textDecorationLine: "line-through" },
          ]}
        >
          {todo.title}
        </Text>
        {todo.done && <Image style={s.img} source={check} />}
      </TouchableOpacity>
    </>
  );
}
