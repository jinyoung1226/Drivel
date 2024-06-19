import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeMain from '../Screens/Home/HomeMain';
import {View, Text, StyleSheet} from 'react-native';
import Alarm from '../assets/homeIcon/alarm.svg';
import Search from '../assets/homeIcon/search.svg';

const Stack = createStackNavigator();

const HomeTab = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeMain}
        options={{
          headerTransparent: true,
          headerTitle: () => (
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitleText}>Drivel</Text>
              <View style={styles.iconContainer}>
                <Alarm />
                <Search />
              </View>
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  headerStyle: {
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  headerTitleText: {
    color: '#ffffff',
    fontSize: 22,
    fontFamily: 'YdestreetB',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 16,
    paddingVertical: 6.72,
  },
});

export default HomeTab;
