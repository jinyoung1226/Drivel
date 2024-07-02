import React, {useEffect, useRef, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import colors from '../styles/colors';
import {textStyles} from '../styles/textStyles';
import LinearGradient from 'react-native-linear-gradient';
const BUTTON_HEIGHT = 38;
const VISIBLE_ITEMS_COUNT = 5;
const currentYear = new Date().getFullYear();
const YEAR_ITEMS = Array.from({length: 50}, (_, i) => `${currentYear + i}년`);
const MONTH_ITEMS = Array.from(
  {length: 12},
  (_, i) => `${(i + 1).toString().padStart(2, '0')}월`,
);
const DAY_ITEMS = Array.from(
  {length: 31},
  (_, i) => `${(i + 1).toString().padStart(2, '0')}일`,
);

const DatePicker = ({value, onChange}) => {
  const yearRef = useRef(null);
  const monthRef = useRef(null);
  const dayRef = useRef(null);
  const [selectedYearIndex, setSelectedYearIndex] = useState(
    YEAR_ITEMS.indexOf(`${value.getFullYear()}년`),
  );
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(
    value.getMonth(),
  );
  const [selectedDayIndex, setSelectedDayIndex] = useState(value.getDate() - 1);
  const [isScrolling, setIsScrolling] = useState({
    year: false,
    month: false,
    day: false,
  });

  useEffect(() => {
    const yearIndex = YEAR_ITEMS.indexOf(`${value.getFullYear()}년`);
    const monthIndex = value.getMonth();
    const dayIndex = value.getDate() - 1;

    yearRef.current.scrollTo({y: yearIndex * BUTTON_HEIGHT, animated: false});
    monthRef.current.scrollTo({y: monthIndex * BUTTON_HEIGHT, animated: false});
    dayRef.current.scrollTo({y: dayIndex * BUTTON_HEIGHT, animated: false});

    setSelectedYearIndex(yearIndex);
    setSelectedMonthIndex(monthIndex);
    setSelectedDayIndex(dayIndex);
    console.log('value', value);
  }, [value]);

  const handleScroll = (items, key) => {
    return event => {
      const index = Math.round(
        event.nativeEvent.contentOffset.y / BUTTON_HEIGHT,
      );
      const newValue = new Date(value.getTime());

      if (key === 'year') {
        newValue.setFullYear(parseInt(items[index]));
        setSelectedYearIndex(index);
        setIsScrolling(prev => ({...prev, year: false}));
      }
      if (key === 'month') {
        newValue.setMonth(index);
        setSelectedMonthIndex(index);
        setIsScrolling(prev => ({...prev, month: false}));
      }
      if (key === 'day') {
        newValue.setDate(parseInt(items[index]));
        setSelectedDayIndex(index);
        setIsScrolling(prev => ({...prev, day: false}));
      }

      onChange(newValue);
    };
  };

  const handleScrollBeginDrag = key => {
    setIsScrolling(prev => ({...prev, [key]: true}));
  };

  const renderItems = (items, ref, selectedIndex, key) => {
    const fullItems = ['', '', ...items, '', ''];
    return (
      <ScrollView
        ref={ref}
        snapToInterval={BUTTON_HEIGHT}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        onScrollBeginDrag={() => handleScrollBeginDrag(key)}
        onMomentumScrollEnd={handleScroll(items, key)}>
        {fullItems.map((item, index) => {
          const isSelected = index === selectedIndex + 2 && !isScrolling[key];
          return (
            <View key={index} style={styles.button}>
              <Text
                style={[
                  styles.buttonLabel,
                  isSelected && styles.selectedButtonLabel,
                ]}>
                {item}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      {renderItems(YEAR_ITEMS, yearRef, selectedYearIndex, 'year')}
      {renderItems(MONTH_ITEMS, monthRef, selectedMonthIndex, 'month')}
      {renderItems(DAY_ITEMS, dayRef, selectedDayIndex, 'day')}
      <LinearGradient
        colors={[
          '#ffffff',
          'rgba(255, 255, 255, 0)',
          'rgba(255, 255, 255, 0)',
          'rgba(255, 255, 255, 0)',
          '#ffffff',
        ]}
        style={styles.overlay}
        pointerEvents="none">
        <View style={styles.overlayInner} />
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: BUTTON_HEIGHT * VISIBLE_ITEMS_COUNT,
    width: '90%',
    alignSelf: 'center',
  },
  scrollView: {flex: 1},
  button: {
    height: BUTTON_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: [textStyles.B1, {color: colors.Gray05}],
  selectedButtonLabel: [textStyles.B1, {color: colors.Gray10}],
  overlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },
  overlayInner: {
    height: BUTTON_HEIGHT,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderRadius: 5,
  },
});

export default DatePicker;
