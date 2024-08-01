import React, {useEffect, useLayoutEffect, useState} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { textStyles } from "../../styles/textStyles";
import colors from "../../styles/colors";
import BackIcon from "../../assets/icons/BackIcon";
import {
  driveStyle,
  driveTheme,
  driveWith,
} from '../../assets/onboardingData/onBoardingData';
import ChipContainer from "../../components/ChipContainer";
import CustomButton from "../../components/CustomButton";
const MyDriveTagEdit = ({navigation, route}) => {
  const item = route.params.item;
  const [selectedDriveStyle, setSelectedDriveStyle] = useState([]);
  const [selectedDriveTheme, setSelectedDriveTheme] = useState([]);
  const [selectedDriveTogether, setSelectedDriveTogether] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '나의 드라이브 태그',
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

  useEffect(() => {
    setSelectedDriveStyle(item.styles.map((e)=>e.id));
    setSelectedDriveTheme(item.themes.map((e)=>e.id));
    setSelectedDriveTogether(item.togethers.map((e)=>e.id));
  },[]);
  return (
    <View style={{backgroundColor:colors.BG, flex:1, padding:16}}>
      <Text style={[textStyles.H5, {color:colors.Gray10}]}>드라이브 풍경</Text>
      <View style={{height:8}}/>
      <Text style={[textStyles.M14, {color: colors.Gray06}]}>
        최소 2개 선택 가능해요
      </Text>
      <View style={{height:16}}/>
      <ChipContainer
        containerStyle={{flexDirection: 'row'}}
        type={'multi'}
        data={driveTheme}
        selectedItem={selectedDriveTheme}
        onSelectedHandler={items => setSelectedDriveTheme(items)}
      />
      <View style={{height:32}}/>
      <Text style={[textStyles.H5, {color:colors.Gray10}]}>드라이브 스타일</Text>
      <View style={{height:8}}/>
      <Text style={[textStyles.M14, {color: colors.Gray06}]}>
        최소 2개 선택 가능해요
      </Text>
      <View style={{height:16}}/>
      <ChipContainer
        containerStyle={{flexDirection: 'row'}}
        type={'multi'}
        data={driveStyle}
        selectedItem={selectedDriveStyle}
        onSelectedHandler={items => setSelectedDriveStyle(items)}
      />
      <View style={{height:32}}/>
      <Text style={[textStyles.H5, {color:colors.Gray10}]}>드라이브 스타일</Text>
      <View style={{height:8}}/>
      <Text style={[textStyles.M14, {color: colors.Gray06}]}>
        최소 2개 선택 가능해요
      </Text>
      <View style={{height:16}}/>
      <ChipContainer
        containerStyle={{flexDirection: 'row'}}
        type={'multi'}
        data={driveWith}
        selectedItem={selectedDriveTogether}
        onSelectedHandler={items => setSelectedDriveTogether(items)}
      />
      <View style={{flex:1}}/>
      <CustomButton title={'완료하기'} onPress={()=>{navigation.goBack()}}/>
    </View>
  )
  }

export default MyDriveTagEdit;