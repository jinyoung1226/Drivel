import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import DriveMain from '../Screens/DriveCourse/DriveMain';
import DriveDetail from '../Screens/DriveCourse/DriveDetail';
import {useNavigation} from '@react-navigation/native';
import Share from '../assets/Icon/share.svg';
import BackButton from '../assets/Icon/BackButton.svg';

const Stack = createStackNavigator();

const DriveTab = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="DriveMain">
      <Stack.Screen name="DriveMain" component={DriveMain} />
      <Stack.Screen
        name="DriveDetail"
        component={DriveDetail}
        options={{
          headerLeft: () => (
            <Pressable onPress={() => navigation.goBack()}>
              <View style={styles.leftIconContainer}>
                <BackButton />
              </View>
            </Pressable>
          ),
          headerTitle: () => (
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitleText}>상세정보</Text>
            </View>
          ),
          headerRight: () => (
            <View style={styles.rightIconContainer}>
              <Share />
            </View>
          ),
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  headerTitleContainer: {
    alignItems: 'center',
  },

  headerTitleText: {
    color: '#191919',
    fontSize: 18,
    fontFamily: 'SUIT-Bold',
  },
  rightIconContainer: {
    flexDirection: 'row',
    paddingVertical: 6.72,
    marginRight: 22,
  },
  leftIconContainer: {
    flexDirection: 'row',
    paddingVertical: 6.72,
    marginLeft: 16,
  },
});

export default DriveTab;
