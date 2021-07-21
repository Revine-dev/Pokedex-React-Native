import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "react-query";
import Loading from "./Loading";

export default Pokemons = () => {
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(50);

  const fetchData = async () => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${skip}&limit=${limit}`
    );
    return res.json();
  };

  const { data, status, error } = useQuery("pokedex", fetchData);

  useEffect(() => {
    fetchData();
  }, [skip, limit]);

  return (
    <View style={styles.container}>
      {status !== "success" ? (
        <Loading />
      ) : (
        <FlatList
          data={data.results}
          renderItem={({ item }) => {
            return (
              <View style={styles.pokedexList}>
                <TouchableOpacity onPress={() => console.log(item.url)}>
                  <Text style={styles.pokedexText}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
          keyExtractor={(item) => item.url}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    textAlign: "center",
    padding: 15,
  },
  pokedexList: {
    width: "100%",
    backgroundColor: "red",
    padding: 20,
    marginBottom: 10,
  },
  pokedexText: {
    textAlign: "center",
    textTransform: "uppercase",
    color: "white",
    fontSize: 20,
  },
});
