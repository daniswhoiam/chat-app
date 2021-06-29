// Import packages
import React from 'react';
import 'react-native-gesture-handler';

// Import React navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Create the navigator
const Stack = createStackNavigator();

// Import custom screens
import Start from './components/Start';
import Chat from './components/Chat';

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          component={Start}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={props => ({ title: props.route.params.name })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
