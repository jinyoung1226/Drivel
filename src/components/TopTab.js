import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {textStyles} from '../styles/textStyles';
import colors from '../styles/colors';

const TopTab = ({activeTab, tabName, setActiveTab}) => {
  return (
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
          {activeTab === index && <View style={styles.activeTabUnderline} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContainer: {
    height: 36,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.Gray04,
  },

  tabButton: {
    flex: 1,
    alignItems: 'center',
  },

  tabButtonText: [textStyles.H4, {color: colors.Gray04}],
  activeTabButton: {
    color: colors.Blue,
  },
  activeTabUnderline: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#0000FF', // 변경된 색상
  },
});

export default TopTab;
