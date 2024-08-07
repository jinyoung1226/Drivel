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
  // const [activeTab, setActiveTab] = React.useState(0);
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();
  const isAnimating = useRef(false);

  useEffect(() => {
    if (!isAnimating.current) {
      Animated.timing(animatedValue, {
        toValue: (activeTab * (windowWidth - 32)) / tabName.length,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        isAnimating.current = false;
      });
    }
  }, [activeTab]);

  const handleScroll = event => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offsetX / windowWidth);
    setActiveTab(newIndex);

    animatedValue.setValue(
      ((offsetX / windowWidth) * windowWidth) / tabName.length,
    );
  };

  const handlePress = index => {
    isAnimating.current = true;
    // scrollViewRef.current.scrollTo({x: index * windowWidth, animated: true});
    setTimeout(() => {
      setActiveTab(index);
      isAnimating.current = false;
    }, 250);
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
