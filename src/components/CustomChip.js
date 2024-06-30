import React from "react";
import { Pressable, Text, StyleSheet, ViewStyle, View } from "react-native";
import colors from "../styles/colors";
import { textStyles } from "../styles/textStyles";

const CustomChip = ({
  data,
  type,
  selectedItem,
  onSelectedHandler,
  containerStyle,
  chipStyle,
}) => {

  const Chip = ({
    item, 
    onPressHandler, 
    isActive= false, 
    style}) => {
  
    return (
      <Pressable
        onPress={onPressHandler}
        style={{
          alignSelf: "flex-start",
          height:35,
          paddingHorizontal:16,
          borderWidth: 1,
          borderRadius: 24,
          justifyContent: "center",
          borderColor: isActive ? colors.Blue : colors.Gray03,
          backgroundColor: isActive ? colors.Blue : null,
          marginRight: 8,
        }}
      >
        <Text
          style={[textStyles.B4,
            {height:15, color: isActive ? colors.Light_Blue : colors.Gray10 }
          ]}
        >
          {item}
        </Text>
      </Pressable>
    );
  };

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
      {data.map((item) => {
        const isActive = Array.isArray(selectedItem)
          ? selectedItem.includes(item)
          : selectedItem === item;

        return (
          <Chip
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

export default CustomChip;

