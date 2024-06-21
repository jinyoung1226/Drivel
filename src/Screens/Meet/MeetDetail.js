import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';


const MeetDetail = ({route}) => {
  const MeetInfo = route.params.item
  return (
    <View>
      <Text>{MeetInfo.title}</Text>
    </View>
  );
}
export default MeetDetail;