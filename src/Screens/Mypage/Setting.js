import React, {useLayoutEffect} from 'react';
import {Text, View, TouchableOpacity, Linking} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import { ScrollView } from 'react-native-gesture-handler';
import BackIcon from '../../assets/icons/BackIcon';
import {useDispatch} from 'react-redux';
import {logout} from '../../features/auth/authActions';
import GrayLine from '../../components/GrayLine';
import { useNavigation } from '@react-navigation/native';


const useInfo = [
  {title:'1:1 문의', pageName:'1on1'},
  {title:'도움말', pageName:'Help'},
  {title:'공지사항', pageName:'Notice'},
]

const policy = [
  {title:'서비스 이용약관', link: 'https://peppered-game-6ea.notion.site/5a78b112fec74a2184526fe314dce3cf'},
  {title:'개인정보 처리방침', link: 'https://peppered-game-6ea.notion.site/74aa30df62754ddfb6aeae8d82b9d96d'},
  {title:'커뮤니티 이용규칙', link: 'https://peppered-game-6ea.notion.site/132198f8638c4588ae9a6954dfc86133'} 
]


const Setting = () => {

const navigation = useNavigation();

const SetTitle = ({title}) => {
  return (
    <Text style={[textStyles.H5, {color:colors.Gray06, paddingHorizontal:24, paddingVertical:16}]}>
      {title}
    </Text>
  )
}
const SettingListItem = ({title, onPress}) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={{height:51, justifyContent:'center', paddingHorizontal:24}}>
      <Text style={[textStyles.B2, {color:colors.Gray10}]}>{title}</Text>
    </TouchableOpacity>
  ) 
}
  
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: '환경설정',
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
        <ScrollView>
          <SetTitle title="이용 안내"/>
          {useInfo.map((item, index) => (
            <SettingListItem title={item.title} key={index} onPress={() => navigation.navigate(item.pageName)}/>
          ))}
          <GrayLine/>
          <SetTitle title="약관 및 정책"/>
          {policy.map((item, index) => (
            <SettingListItem title={item.title} key={index} onPress={() => Linking.openURL(item.link)}/>
          ))}
          <GrayLine/>
          <SetTitle title="계정"/>
          <SettingListItem title="로그아웃" onPress={handleLogout}/>
        </ScrollView>
      </View>
  )
}

export default Setting;