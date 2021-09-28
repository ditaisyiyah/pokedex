import React, { useEffect } from 'react';
import {
  TouchableHighlight,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  FlatList,
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
                <Text style={styles.name}>{pokemon?.name}</Text>
                <View style={styles.typesAndImage}>
                  <View style={styles.typesContainer}>
                    {pokemon?.types?.map((type, j) => {
                      return (
                        <View style={styles.typesShadow} key={j}>
                          <Text style={styles.types}>{type}</Text>
                        </View>
                      );
                    })}
                  </View>
                  <Pressable
                    style={styles.image}
                    onPress={() => goDetail(i + 1)}
                  >
                    <SvgCssUri
                      height={windowHeight * 0.1}
                      width="100%"
                      uri={pokemon?.picture}
                    />
                  </Pressable>
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
    backgroundColor: '#f48800',
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth,
    height: windowHeight,
  },
  title: {
    color: 'yellow',
    fontSize: 40,
    fontWeight: 'bold',
    paddingVertical: 10,
    height: '10%',
    width: '100%',
    paddingHorizontal: 20,
    textAlignVertical: 'center',
  },
  cardContainer: {
    width: '100%',
    height: '90%',
  },
  cardRow: {
    paddingVertical: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  card: {
    backgroundColor: '#d87800',
    width: '44%',
    height: '9%',
    paddingHorizontal: 10,
    marginVertical: 9,
    borderRadius: 15,
    paddingVertical: 20,
  },
  name: {
    paddingBottom: 10,
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
  typesAndImage: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
  },
  typesContainer: {
    width: '30%',
    height: '50%',
  },
  typesShadow: {
    width: '100%',
    backgroundColor: 'purple',
    borderRadius: 20,
    padding: 2,
    marginBottom: 1,
  },
  types: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
    textAlign: 'center',
  },
  image: {
    width: '70%',
  },
});
