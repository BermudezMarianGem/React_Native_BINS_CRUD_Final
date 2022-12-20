import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RecordDetailScreen from './screens/RecordDetails';
import AddResidentScreen from './screens/AddResident';
import EditResidentScreen from './screens/EditResident';

const Stack = createNativeStackNavigator();

const binsApp = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen
          name="HomeScreen"
          component={ HomeScreen }
          options={{ 
            title: 'HomeScreen', 
            headerRight: () => (
              <Button
              onPress={() => alert('This is a button!')}
              title="Info"
              color="#000"></Button>),
            headerShown: false
          }}
        />
        
        <Stack.Screen
          name="RecordDetailScreen"
          component={ RecordDetailScreen }
          options={{ 
            title: 'RecordDetailScreen', 
          }}
          
        />

        <Stack.Screen
          name="AddResident"
          component={ AddResidentScreen }
          options={{ 
            title: 'AddResident'
          }}
          
        />
        <Stack.Screen
          name="EditResident"
          component={ EditResidentScreen }
          options={{ 
            title: 'EditResident'
          }}
          
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default binsApp;