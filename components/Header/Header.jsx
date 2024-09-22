import { Text, Image } from "react-native";
import { s } from "./Header.style";
import logoimg from "../../assets/logo.png";
export function Header() {
  return (
    <>
      <Image style={s.img} source={logoimg} resizeMode="contain" />
      <Text style={s.subtitle}>Lets do it</Text>
    </>
  );
}
