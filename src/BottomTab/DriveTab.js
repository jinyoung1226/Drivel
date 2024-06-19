import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import DriveMain from '../Screens/DriveCourse/DriveMain';
import DriveDetail from '../Screens/DriveCourse/DriveDetail';
import Alarm from '../assets/homeIcon/alarm.svg';
import Search from '../assets/homeIcon/search.svg';

const Stack = createStackNavigator();

const DriveTab = () => {
  return (
    <Stack.Navigator initialRouteName="DriveMain">
      <Stack.Screen name="DriveMain" component={DriveMain} />
      <Stack.Screen
        name="DriveDetail"
        component={DriveDetail}
        options={{
          headerTitle: () => {
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitleText}>드라이브코스</Text>
              <View style={styles.iconContainer}>
                <Alarm />
                <Search />
              </View>
            </View>;
          },
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

export default DriveTab;
