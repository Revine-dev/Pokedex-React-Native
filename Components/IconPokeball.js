import React from "react";
import { View, Image, Text } from "react-native";

export default IconPokeball = () => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Image
        source={require("../assets/pokeball.png")}
        style={{
          width: 32,
          height: 32,
          marginRight: 10,
        }}
        resizeMode={"contain"}
      />
      <Text>Pokemons</Text>
    </View>
  );
};
