import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Pokemon from './pages/Pokemon';
import Profile from './pages/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#d87800',
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          <Stack.Screen
            name="Pokemon"
            component={Pokemon}
            options={{ title: 'Pokemon List' }}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
            options={{ title: 'Profile' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
