import { View, Pressable, Text, Animated, Dimensions } from 'react-native';
import React from 'react';



const Tabs = ({ selectedIndex, onSelectHandler, menus }) => {
  const width = Dimensions.get('window').width / menus.length;
  const animatedValue = React.useRef(
    new Animated.Value(selectedIndex * width)
  ).current;

  React.useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: selectedIndex * width,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [selectedIndex]);

  return (
    <View style={{ flexDirection: 'row', backgroundColor: "#FFF" }}>
      <Animated.View
        style={{
          position: 'absolute',
          left: 0,
          width: width,
          borderBottomWidth: 1,
          borderBottomColor: "#5168F6",
          transform: [{ translateX: animatedValue }],
          bottom: 0,
        }}
      />
      {menus.map((v, i) => (
        <Pressable
          style={{
            flex: 1,
            height: 44,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          key={v}
          onPress={() => {
            onSelectHandler(i);
          }}
        >
          <Text
            style={[
              {
                color: selectedIndex === i ? "#5168F6" : "#C5C5C6",
              },
            ]}
          >
            {v}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default Tabs;