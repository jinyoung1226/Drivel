import React, {useRef, useEffect} from 'react';
import {
  View,
  ScrollView,
  Dimensions,
  Animated,
  StyleSheet,
  Text,
  Pressable,
} from 'react-native';
import {textStyles} from '../styles/textStyles';
import colors from '../styles/colors';

const windowWidth = Dimensions.get('window').width;

const Tabs = ({tabName, style, activeTab, setActiveTab}) => {


  const handlePress = index => {
      setActiveTab(index);
  };

  return (
    <View
      style={[
        {
          backgroundColor: colors.BG,
        },
        style,
      ]}>
      <View
        style={{
          backgroundColor: colors.BG,
          height: 52,
          paddingHorizontal: 16,
          flexDirection: 'row',
          borderBottomWidth: 1,
          borderBottomColor: colors.Gray02,
          width: windowWidth,
          // elevation: 2,
        }}>
        {tabName.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => handlePress(index)}
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={{flex: 1}} />
            <Text
              style={[
                textStyles.H4,
                {color: activeTab === index ? colors.Blue : colors.Gray04},
              ]}>
              {item}
            </Text>
            <View style={{flex: 1}} />
            <View
              style={{
                height: 2,
                paddingHorizontal: 8,
                width: (windowWidth - 80) / tabName.length,
                backgroundColor: activeTab === index ? colors.Blue : null,
              }}
            />
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Tabs;
