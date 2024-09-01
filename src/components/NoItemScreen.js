import React from 'react';
import {View, Text} from 'react-native';
import colors from '../styles/colors';
import {textStyles} from '../styles/textStyles';


const NoItemScreen = ({text}) => {
  return(
    <View style={{flex:1, alignItems:'center', justifyContent: 'center'}}>
      <View style={{width:66, height:66, backgroundColor:colors.Light_Blue, borderRadius:33, alignItems:'center', justifyContent:'center', flexDirection:'row'}}>
        <View style={{width:5, height:5, borderRadius:10, backgroundColor:colors.Blue}}/>
        <View style={{width:5}}/>
        <View style={{width:5, height:5, borderRadius:10, backgroundColor:colors.Blue}}/>
        <View style={{width:5}}/>
        <View style={{width:5, height:5, borderRadius:10, backgroundColor:colors.Blue}}/>
      </View>
      <Text style={[textStyles.C4, {color:'#64748B', marginTop: 40, textAlign:'center'}]}>{text}</Text>
    </View>
  )
}

export default NoItemScreen;