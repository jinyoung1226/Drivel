import React, {useEffect, useState, useLayoutEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import colors from '../../styles/colors';
import {ScrollView} from 'react-native-gesture-handler';
import { textStyles } from '../../styles/textStyles';
import BackIcon from '../../assets/icons/BackIcon';
const ReportPage = ({navigation, route}) => {

  const reportedId = route.params.targetId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '신고하기',
      headerTitleStyle: [textStyles.H3, {color: colors.Gray10}],
      headerTitleAlign: 'center',
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          style={{padding: 16}}>
          <BackIcon color={colors.Gray10} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  
  return (
    <ScrollView style={{backgroundColor: colors.BG}}>
      <Text>
        {reportedId}
      </Text>
    </ScrollView>
  );
};

export default ReportPage;