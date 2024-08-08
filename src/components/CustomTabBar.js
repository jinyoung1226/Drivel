import React, { useEffect } from 'react';
import { SafeAreaView, View, TouchableOpacity, Text, StyleSheet, Platform } from 'react-native';
import colors from '../styles/colors';
import { textStyles } from '../styles/textStyles';
import { useSelector } from 'react-redux';
const CustomTabBar = ({ state, descriptors, navigation }) => {
  
  const isTabBarVisible = useSelector(state => state.tabBar.isTabBarVisible);

  if (!isTabBarVisible) {
    return null;
  }

  return (
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.name}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tabButton]}
            >
              {options.tabBarIcon && options.tabBarIcon({ focused: isFocused, color: isFocused ? '#000' : '#A1A1A1', size: 24 })}
              <View style={{ height: 3 }} />
              <Text style={[textStyles.B5 ,styles.label, isFocused && styles.focusedLabel]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    height: 72,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 20,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: colors.Gray05,

  },
  focusedLabel: {
    color: colors.Blue,
  },
});

export default CustomTabBar;