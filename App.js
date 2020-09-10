import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './routes/Home';
import Results from './routes/Results';
import Recipe from './routes/Recipe';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ gestureEnabled:false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Results" component={Results} />
        <Stack.Screen name="Recipe" component={Recipe} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
