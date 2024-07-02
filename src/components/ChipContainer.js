import React from 'react';
import {View} from 'react-native';
import CustomChip from './CustomChip';

const ChipContainer = ({
  data,
  type,
  selectedItem,
  onSelectedHandler,
  containerStyle,
  chipStyle,
}) => {
  const onPressHandler = (isActive, item) => {
    if (type === 'single') {
      if (isActive) {
        if (onSelectedHandler) {
          onSelectedHandler('');
        }
      } else {
        if (onSelectedHandler) {
          onSelectedHandler(item);
        }
      }
    } else if (type === 'multi') {
      const selectedItems = Array.isArray(selectedItem)
        ? [...selectedItem]
        : [];

      if (isActive) {
        const index = selectedItems.indexOf(item);
        if (index !== -1) {
          selectedItems.splice(index, 1);
        }
      } else {
        selectedItems.push(item);
      }

      if (onSelectedHandler) {
        onSelectedHandler(selectedItems);
      }
    }
  };

  return (
    <View style={containerStyle}>
      {data.map(item => {
        const isActive = Array.isArray(selectedItem)
          ? selectedItem.includes(item)
          : selectedItem === item;

        return (
          <CustomChip
            key={item}
            item={item}
            style={chipStyle}
            isActive={isActive}
            onPressHandler={() => onPressHandler(isActive, item)}
          />
        );
      })}
    </View>
  );
};

export default ChipContainer;
