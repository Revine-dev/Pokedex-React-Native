import React, { useState } from "react";
import { useQuery } from "react-query";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Loading from "./Loading";
import { AntDesign } from "@expo/vector-icons";

export default PokemonDetail = ({ navigation, route }) => {
  const totalPokemons = 898;

  const [url, setUrl] = useState(route.params.url || "");

  const fetchData = async () => {
    const res = await fetch(url);
    return res.json();
  };

  const { data, status, error } = useQuery(["pokemon", url], fetchData);

  return (
    <SafeAreaView>
      <ScrollView>
        {status !== "success" ? (
          <Loading />
        ) : (
          <View style={styles.container}>
            <View style={styles.pokemonHeader}>
              {data.id > 1 ? (
                <TouchableOpacity
                  onPress={() => {
                    setUrl(`https://pokeapi.co/api/v2/pokemon/${data.id - 1}/`);
                  }}
                >
                  <AntDesign name="leftcircleo" size={26} color="black" />
                </TouchableOpacity>
              ) : (
                <AntDesign name="leftcircleo" size={26} color="lightgray" />
              )}

              <View>
                <Text style={styles.pokemonName}>{data.name}</Text>
                <Text style={{ textAlign: "center" }}>#{data.id}</Text>
              </View>
              {data.id < totalPokemons ? (
                <TouchableOpacity
                  onPress={() => {
                    setUrl(`https://pokeapi.co/api/v2/pokemon/${data.id + 1}/`);
                  }}
                >
                  <AntDesign name="rightcircleo" size={26} color="black" />
                </TouchableOpacity>
              ) : (
                <AntDesign name="rightcircleo" size={26} color="lightgray" />
              )}
            </View>
            <Image
              style={styles.pokemonImg}
              resizeMode="contain"
              source={{
                uri: data.sprites.other["official-artwork"].front_default
                  ? data.sprites.other["official-artwork"].front_default
                  : data.sprites.front_default,
              }}
            />
            <FlatList
              data={data.types}
              contentContainerStyle={{ width: "100%", flexDirection: "row" }}
              renderItem={({ item }) => {
                return (
                  <Text style={styles.pokemonTypes}>{item.type.name}</Text>
                );
              }}
              keyExtractor={(item, index) => index.toString()}
            />

            <View
              style={[
                styles.pokemonHeader,
                {
                  flexDirection: "column",
                },
              ]}
            >
              <Text style={styles.separatorName}>Stats :</Text>
              <FlatList
                data={data.stats}
                contentContainerStyle={{ width: "100%" }}
                numColumns="2"
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        flexDirection: "column",
                        textAlign: "center",
                        width: "50%",
                      }}
                    >
                      <Text
                        style={styles.list}
                      >{`${item.stat.name.toUpperCase()} : ${
                        item.base_stat
                      }`}</Text>
                    </View>
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>

            <View
              style={[
                styles.pokemonHeader,
                {
                  flexDirection: "column",
                },
              ]}
            >
              <Text style={styles.separatorName}>Moves :</Text>
              <FlatList
                data={data.moves}
                contentContainerStyle={{ width: "100%" }}
                numColumns="2"
                renderItem={({ item }) => {
                  return (
                    <View
                      style={{
                        flexDirection: "column",
                        textAlign: "center",
                        width: "50%",
                      }}
                    >
                      <Text
                        style={[styles.list, { textTransform: "capitalize" }]}
                      >
                        {item.move.name}
                      </Text>
                    </View>
                  );
                }}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  pokemonHeader: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  pokemonName: {
    textTransform: "uppercase",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
  pokemonImg: {
    marginTop: 20,
    marginBottom: 50,
    width: 150,
    height: 150,
  },
  pokemonTypes: {
    borderStyle: "solid",
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
    marginBottom: 15,
    borderRadius: 13,
    marginRight: 10,
    textTransform: "capitalize",
  },
  separatorName: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 15,
  },
  list: {
    textAlign: "center",
  },
});
