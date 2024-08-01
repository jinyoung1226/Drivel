import React from "react";

import { View, Text, TouchableOpacity, StyleSheet, Pressable } from "react-native";
import { textStyles } from "../../styles/textStyles";
import colors from "../../styles/colors";

const RequiredInfo = () => {
  return (
    <View>
      <Text style={[textStyles.H4]}>필수정보 입력</Text>
    </View>
  );

}

export default RequiredInfo;