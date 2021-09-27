import React, { useEffect } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';
import { SvgCssUri } from 'react-native-svg';
import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonsCreator } from '../store/action';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const pokedexAPI = `https://pokeapi.co/api/v2/pokemon`;

export default function Pokemon({ navigation }) {
  const dispatch = useDispatch();
  const pokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(getPokemonsCreator(pokedexAPI));
  }, []);

  function goDetail(id) {
    navigation.navigate('Profile', { id });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>POKEDEX</Text>
      <ScrollView style={styles.cardContainer}>
        <View style={styles.cardRow}>
          {pokemons.map((pokemon, i) => {
            return (
              <View style={styles.card} key={i}>
                <Text style={styles.name}>{pokemon.name}</Text>
                <Pressable onPress={() => goDetail(i + 1)}>
                  <SvgCssUri height="70%" width="100%" uri={pokemon.picture} />
                </Pressable>
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
            );
          })}
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
    backgroundColor: 'red',
  },
  cardRow: {
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  card: {
    backgroundColor: '#b0aa99',
    width: '44%',
    height: '20%',
    padding: 4,
    marginVertical: 4,
    borderRadius: 15,
  },
  name: {
    paddingVertical: 10,
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#e65481',
  },
  typesContainer: {
    backgroundColor: 'blue',
  },
  picture: {
    backgroundColor: 'yellow',
  },
});
