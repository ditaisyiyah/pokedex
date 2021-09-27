import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonCreator } from '../store/action';
import { SvgCssUri } from 'react-native-svg';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const pokedexAPI = `https://pokeapi.co/api/v2/pokemon`;

export default function Profile({ navigation, route }) {
  const { id } = route.params;

  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon);

  useEffect(() => {
    dispatch(getPokemonCreator(pokedexAPI, id));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{pokemon.name}</Text>
      <SvgCssUri width="50%" height="40%" uri={pokemon.picture} />
      <ScrollView style={styles.cardContainer}>
        <View style={styles.card}>
          <View style={styles.typesContainer}>
            {pokemon.types.map((type, j) => {
              return (
                <Text style={styles.types} key={j}>
                  {type}
                </Text>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    paddingVertical: 10,
  },
  cardContainer: {
    flex: 1,
    paddingHorizontal: 4,
    width: '100%',
    height: '100%',
    backgroundColor: '#e65481',
  },
});
