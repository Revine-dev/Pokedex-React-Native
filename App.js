import React from "react";
import Pokedex from "./Components/Pokedex";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import PokemonDetail from "./Components/PokemonDetail";
import IconPokeball from "./Components/IconPokeball";

const queryClient = new QueryClient();
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <QueryClientProvider client={queryClient}>
        <Stack.Navigator>
          <Stack.Screen
            name="Pokedex"
            options={{
              headerTitle: () => {
                return <IconPokeball />;
              },
            }}
            component={Pokedex}
          />
          <Stack.Screen name="Pokemon" component={PokemonDetail} />
        </Stack.Navigator>
      </QueryClientProvider>
    </NavigationContainer>
  );
}
