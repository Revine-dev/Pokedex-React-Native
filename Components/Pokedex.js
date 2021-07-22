import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";
import { useQuery } from "react-query";
import Loading from "./Loading";
import { LogBox } from "react-native";

export default Pokedex = () => {
  const limit = 50;
  const totalPokemons = 898;
  const maxPage = Math.ceil(totalPokemons / limit);

  const [skip, setSkip] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${skip}&limit=${limit}`
    );
    return res.json();
  };

  const { data, status, error } = useQuery(["pokedex", currentPage], fetchData);

  useEffect(() => {
    LogBox.ignoreLogs(["VirtualizedLists should never be nested"]);
  }, []);

  const changePage = (type) => {
    let add = limit;
    if (type === "-") {
      add = -limit;
    }

    setSkip(skip + add);
    setCurrentPage(add > 0 ? currentPage + 1 : currentPage - 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {status !== "success" ? (
          <Loading />
        ) : (
          <View>
            <FlatList
              data={data.results}
              scrollEnabled="false"
              renderItem={({ item, index }) => {
                if (currentPage === 1) {
                  index++;
                } else {
                  index = 50 * (currentPage - 1) + 1 + index;
                }

                if (index > totalPokemons) {
                  return;
                }

                return (
                  <View style={styles.pokedexList}>
                    <TouchableOpacity
                      onPress={() => console.log(item.url)}
                      style={styles.pokedexEl}
                    >
                      <View style={styles.pokedexLeft}>
                        <Text style={styles.PokedexId}>#{index}</Text>
                      </View>
                      <View style={[styles.pokedexEl, styles.pokedexRight]}>
                        <Image
                          style={styles.pokedexImg}
                          source={{
                            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${index}.png`,
                          }}
                        />
                        <Text style={styles.pokedexText}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              }}
              keyExtractor={(item) => item.url}
            />

            <View
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {data.previous ? (
                <Button
                  title="Page précédente"
                  onPress={() => changePage("-")}
                />
              ) : (
                <Text>Page précédente</Text>
              )}
              <Text>Page {currentPage}</Text>
              {currentPage < maxPage ? (
                <Button title="Page suivante" onPress={() => changePage("+")} />
              ) : (
                <Text>Page suivante</Text>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    margin: 15,
  },
  pokedexList: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 20,
    marginBottom: 10,
  },
  pokedexEl: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  pokedexLeft: {
    width: "15%",
  },
  PokedexId: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  pokedexRight: {
    width: "85%",
  },
  pokedexImg: {
    width: 32,
    height: 32,
    marginRight: 20,
  },
  pokedexText: {
    textAlign: "center",
    textTransform: "uppercase",
    fontSize: 20,
  },
});
