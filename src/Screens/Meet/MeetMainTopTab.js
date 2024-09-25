import {View, Pressable, Text, Animated} from 'react-native';
import React from 'react';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';

const MeetMainTopTab = ({selectedIndex, onSelectHandler, menus}) => {

  return (
    <View style={{backgroundColor: colors.BG}}>
      <View style={{flexDirection: 'row'}}>
        {menus.map((v, i) => (
          <Pressable
            style={{
              paddingHorizontal: 12,
              padding: 8,
              alignItems: 'center',
              justifyContent: 'center',
              borderBottomWidth: 3,
              borderBottomColor: selectedIndex === i ? colors.Blue : 'transparent',
            }}
            key={v}
            onPress={() => {
              onSelectHandler(i);
            }}>
            <Text
              style={[
                textStyles.H3,
                {color: selectedIndex === i ? colors.Gray10 : colors.Gray03},
              ]}>
              {v}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default MeetMainTopTab;
