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

const TabScreens = ({tabName, tabScreens}) => {
  const [activeTab, setActiveTab] = React.useState(0);
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
      ((offsetX / windowWidth) * (windowWidth - 32)) / tabName.length,
    );
  };

  const handlePress = index => {
    isAnimating.current = true;
    scrollViewRef.current.scrollTo({x: index * windowWidth, animated: true});
    setTimeout(() => {
      setActiveTab(index);
      isAnimating.current = false;
    }, 250);
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          paddingHorizontal: 16,
          borderBottomWidth: 1,
          borderColor: colors.Gray02,
        }}>
        <View style={styles.tabContainer}>
          {tabName.map((item, index) => (
            <Pressable
              key={index}
              onPress={() => handlePress(index)}
              style={styles.tabButton}>
              <Text
                style={[
                  textStyles.H4,
                  {color: activeTab === index ? colors.Blue : colors.Gray04},
                ]}>
                {item}
              </Text>
            </Pressable>
          ))}
        </View>
        <Animated.View
          style={{
            paddingHorizontal: 8,
            width: (windowWidth - 32) / tabName.length,
            transform: [{translateX: animatedValue}],
          }}>
          <View
            style={{
              borderBottomWidth: 2,
              borderBottomColor: '#5168F6',
              width: '100%',
            }}
          />
        </Animated.View>
      </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}>
        {tabScreens.map((screen, index) => (
          <View key={index} style={{width: windowWidth, height: '100%'}}>
            {screen}
          </View>
        ))}
      </ScrollView>
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
});

export default TabScreens;
