import React from "react";
import Pokemons from "./Components/Pokemons";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import PokemonDetail from "./Components/PokemonDetail";

const queryClient = new QueryClient();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator>
          <Stack.Screen name="Pokemons" component={Pokemons} />
          <Stack.Screen name="Pokemon" component={PokemonDetail} />
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
}
