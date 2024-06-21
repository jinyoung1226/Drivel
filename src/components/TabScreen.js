import { useState, useRef } from 'react';
import { Dimensions, View, ScrollView } from 'react-native';
import Tabs from './Tabs';

const TabScreen = ({ menus, initTabIndex = 0, contents }) => {
  const [selectedIndex, setSelectedIndex] = useState(initTabIndex);
  const scrollViewRef = useRef(null);
  const windowWidth = Dimensions.get('window').width;

  const onSelectTab = (index) => {
    setSelectedIndex(index);
    scrollViewRef.current?.scrollTo({
      x: windowWidth * index,
      animated: true,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        menus={menus}
        selectedIndex={selectedIndex}
        onSelectHandler={onSelectTab}
      />
      <ScrollView
        horizontal
        pagingEnabled
        ref={scrollViewRef}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.floor(
            Math.max(0, e.nativeEvent.contentOffset.x) / windowWidth
          );
          setSelectedIndex(newIndex);
        }}
      >
        {contents.map((content, index) => (
          <View
            key={index}
            style={{
              width: windowWidth,
            }}
          >
            {content}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default TabScreen;