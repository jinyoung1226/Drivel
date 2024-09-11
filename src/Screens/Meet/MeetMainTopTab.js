import {View, Pressable, Text, Animated} from 'react-native';
import React from 'react';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';

const MeetMainTopTab = ({selectedIndex, onSelectHandler, menus}) => {
  const animatedValue = React.useRef(
    new Animated.Value(selectedIndex * 80),
  ).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: selectedIndex * 80,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [selectedIndex]);

  return (
    <View style={{backgroundColor: colors.BG}}>
      <View style={{flexDirection: 'row'}}>
        {menus.map((v, i) => (
          <Pressable
            style={{
              width: 80,
              padding: 8,
              alignItems: 'center',
              justifyContent: 'center',
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
      <Animated.View
        style={{
          width: 80,
          borderBottomWidth: 3,
          borderBottomColor: '#5168F6',
          transform: [{translateX: animatedValue}],
        }}
      />
    </View>
  );
};

export default MeetMainTopTab;
