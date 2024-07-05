import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated} from 'react-native';
import {textStyles} from '../styles/textStyles';
import colors from '../styles/colors';

const TopTab = ({activeTab, tabName, setActiveTab}) => {
  const windowWidth = Dimensions.get('window').width;
  const animatedValue = React.useRef(
    new Animated.Value(activeTab * windowWidth/tabName.length),
  ).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: activeTab * (windowWidth-32)/tabName.length,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [activeTab]);

  return (
    <View style={{padding:16}}>
    <View style={styles.tabContainer}>
      {tabName.map((item, index) => (
        <TouchableOpacity
          onPress={() => setActiveTab(index)}
          style={styles.tabButton}>
          <Text
            style={[
              styles.tabButtonText,
              activeTab === index && styles.activeTabButton,
            ]}>
            {item}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
    <Animated.View
      style={{
        width: (windowWidth-32)/tabName.length,
        borderBottomWidth: 3,
        borderBottomColor: '#5168F6',
        transform: [{translateX: animatedValue}],
      }}
    />
  </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    height: 52,
    flexDirection: 'row',

  },

  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabButtonText: [textStyles.H4, {color: colors.Gray04}],
  activeTabButton: {
    color: colors.Blue,
  },
});

export default TopTab;
