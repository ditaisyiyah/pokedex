import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getPokemonCreator } from '../store/action';
import { SvgCssUri } from 'react-native-svg';
import { Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const pokedexAPI = `https://pokeapi.co/api/v2/pokemon`;

export default function Profile({ navigation, route }) {
  const { id } = route.params;

  const dispatch = useDispatch();
  const pokemon = useSelector((state) => state.pokemon);

  const [menu, setMenu] = useState('about');

  useEffect(() => {
    dispatch(getPokemonCreator(pokedexAPI, id));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        #{id} {pokemon?.name}
      </Text>
      <View style={styles.card}>
        <View style={styles.typesAndImage}>
          <View style={styles.image}>
            <SvgCssUri width="100%" height="100%" uri={pokemon?.picture} />
          </View>
          <View style={styles.typesContainer}>
            {pokemon?.types?.map((type, j) => {
              return (
                <View style={styles.typesShadow} key={j}>
                  <Text style={styles.types}>{type}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.cardText}>
          <View style={styles.menu}>
            <Pressable onPress={() => setMenu('about')}>
              <Text style={styles.menuText}>About</Text>
            </Pressable>
            <Pressable onPress={() => setMenu('baseStats')}>
              <Text style={styles.menuText}>Base Stats</Text>
            </Pressable>
            <Pressable onPress={() => setMenu('moves')}>
              <Text style={styles.menuText}>Moves</Text>
            </Pressable>
          </View>
          <ScrollView style={styles.detailContainer}>
            <View style={styles.detail}>
              {menu == 'about' ? (
                <>
                  <View style={styles.subMenu}>
                    {Object.keys(pokemon?.about).map((el, i) => {
                      return (
                        <Text style={styles.subMenuText} key={i}>
                          {el}
                        </Text>
                      );
                    })}
                  </View>
                  <View style={styles.field}>
                    {Object.values(pokemon?.about).map((el, j) => {
                      return (
                        <Text style={styles.fieldText} key={j}>
                          : {el}
                        </Text>
                      );
                    })}
                  </View>
                </>
              ) : menu == 'baseStats' ? (
                <>
                  <View style={styles.subMenu}>
                    {pokemon?.baseStats?.map((el, i) => {
                      return (
                        <Text style={styles.subMenuText} key={i}>
                          {el.name}
                        </Text>
                      );
                    })}
                  </View>
                  <View style={styles.field}>
                    {pokemon?.baseStats?.map((el, j) => {
                      return (
                        <View style={styles.statsValue} key={j}>
                          <Text style={styles.fieldText}>: {el.value}</Text>
                          <Progress.Bar
                            style={styles.bar}
                            progress={el.value / 100}
                          />
                        </View>
                      );
                    })}
                  </View>
                </>
              ) : (
                <View style={styles.movesRow}>
                  {pokemon?.moves.map((el, i) => {
                    return (
                      <Text style={styles.moves} key={i}>
                        🔸 {el}
                      </Text>
                    );
                  })}
                </View>
              )}
            </View>
          </ScrollView>
        </View>
      </View>
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
    padding: 20,
  },
  title: {
    color: 'yellow',
    fontSize: 40,
    fontWeight: 'bold',
    paddingBottom: 10,
    height: '10%',
    width: '100%',
  },
  card: {
    width: '100%',
    height: '90%',
    alignItems: 'center',
    backgroundColor: '#d87800',
    borderRadius: 20,
  },
  typesAndImage: {
    width: '100%',
    height: '40%',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    padding: 20,
  },
  image: {
    width: '70%',
    height: '100%',
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
    marginBottom: 5,
  },
  types: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },

  cardText: {
    borderRadius: 20,
    width: '100%',
    height: '60%',
    backgroundColor: 'purple',
  },
  menu: {
    height: '14%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 14,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  },
  menuText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
  detailContainer: {
    height: '86%',
    width: '100%',
  },
  detail: {
    height: '100%',
    width: '100%',
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subMenu: {
    width: '40%',
  },
  subMenuText: {
    fontSize: 22,
    color: 'white',
    paddingBottom: 5,
  },
  field: {
    width: '40%',
  },
  fieldText: {
    paddingBottom: 5,
    fontSize: 22,
    color: 'white',
    flexWrap: 'wrap',
  },
  statsName: {
    paddingBottom: 5,
    fontSize: 22,
    color: 'white',
  },
  movesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  moves: {
    fontSize: 22,
    color: 'white',
    paddingBottom: 5,
    width: '44%',
  },
  statsValue: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bar: {
    width: '70%',
    color: 'yellow',
  },
});
