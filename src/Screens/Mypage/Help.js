import React, {useLayoutEffect} from 'react';
import {Text, View, TouchableOpacity, Linking} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import BackIcon from '../../assets/icons/BackIcon';
import {useDispatch} from 'react-redux';
import {logout} from '../../features/auth/authActions';
import { helps } from '../../assets/helpData/helpData';
import ArrowIcon from '../../assets/icons/ArrowIcon';

const Help = ({navigation, route}) => {

  const HelpListItem = ({title, onPress}) => {
    return (
      <TouchableOpacity 
        onPress={onPress}
        style={{flex:1, paddingHorizontal:16, paddingVertical:20, borderColor: colors.Gray03, borderRadius:10, borderWidth:1, marginHorizontal:16, marginBottom:16, flexDirection:'row'}}>
        <View style={{flex:1}}>
          <Text style={[textStyles.H5, {color:colors.Gray10}]}>{title}</Text>
        </View>
        <View>
          <ArrowIcon width={24} height={24} transform={[{rotate: '90deg'}]}/>
        </View>
      </TouchableOpacity>
    ) 
  }
  
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '도움말',
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

  return(
    
      <View style={{backgroundColor:colors.BG, flex:1}}>
        <FlatList
          data={helps}
          renderItem={({item}) => (
            <HelpListItem title={item.title} onPress={{}}/>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
  )
}

export default Help;