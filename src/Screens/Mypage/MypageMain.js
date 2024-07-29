import React, {useState} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, Alert, Modal} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../../features/auth/authActions';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import UserIcon from '../../assets/icons/UserIcon';
import PenIcon from '../../assets/icons/PenIcon';
import ScrapIcon from '../../assets/icons/ScrapIcon';
import ReviewIcon from '../../assets/icons/ReviewIcon';
import DriveHistoryIcon from '../../assets/icons/DriveHistoryIcon';
import {ScrollView} from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import { formDataApi } from '../../api/api';

const MyPage = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [photo, setPhoto] = useState(null);
  const nickname = useSelector(state => state.auth.nickname);
  const dispatch = useDispatch();
  const item = {tags: ['태그1', '태그2', '태그3']};
  const handleLogout = () => {
    dispatch(logout());
  };
  const changeProfileImageDefault = async() => {
    try {
      const response = await formDataApi.post('/profile/image');
      if (response.status == 200) {
        console.log(response.status);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const getPhoto = async () => {
    try {
      const result = await launchImageLibrary({mediaType: 'photo', });
      if (result.didCancel) {
        return;
      }
      setPhoto(result.assets[0]);
      navigation.navigate('SelectedProfileImage', {photo: result.assets[0]});
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }
    
  return (
    <ScrollView style={{backgroundColor: colors.BG}}>
      <Modal 
        animationType='fade'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{flex:1, backgroundColor:'#00000070'}}>
          <TouchableOpacity style={{flex:1}} onPress={()=>{setModalVisible(!modalVisible)}} />
            <View style={{flexDirection:'row'}} >
            <TouchableOpacity style={{width:32}} onPress={()=>{setModalVisible(!modalVisible)}} />
              <View style={{flex:1, backgroundColor: colors.BG, borderRadius:10, padding:16}}>
                <Text style={[textStyles.H3, {color:colors.Gray10}]}>프로필 사진 설정</Text>
                <View style={{height:16}}/>
                <TouchableOpacity
                  onPress={()=> {getPhoto(); setModalVisible(!modalVisible);}}  
                >
                  <Text style={[textStyles.B3, {color:colors.Gray08}]}>앨범에서 사진 선택</Text>
                </TouchableOpacity>
                <View style={{height:16}}/>
                <TouchableOpacity
                  onPress={()=> {changeProfileImageDefault(); setModalVisible(!modalVisible);}}  
                >
                  <Text style={[textStyles.B3, {color:colors.Gray08}]}>기본 이미지 적용</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={{width:32}} onPress={()=>{setModalVisible(!modalVisible)}} />
            </View>
          <TouchableOpacity style={{flex:1}} onPress={()=>{setModalVisible(!modalVisible)}} />
        </View>
      </Modal>
      <View style={{height: 32}} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 16,
        }}>
        <TouchableOpacity
          style={{width: 90, height: 90}}
          onPress={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View
            style={{
              width: 90,
              height: 90,
              backgroundColor: colors.Gray02,
              borderRadius: 45,
              overflow: 'hidden',
            }}>
            <UserIcon />
          </View>
          <View
            style={{
              position: 'absolute',
              width: 24,
              height: 24,
              backgroundColor: colors.Gray04,
              borderRadius: 12,
              alignSelf: 'flex-end',
              alignItems: 'center',
              justifyContent: 'center',
              bottom: 0,
            }}>
            <PenIcon />
          </View>
        </TouchableOpacity>
        <View style={{width: 16}} />
        <TouchableOpacity 
          style={{flexDirection: 'row', alignItems:'center', flex:1}}
          onPress={() => navigation.navigate('MyInfo')}
        >  
          <View>
            <Text style={[textStyles.H2, {color: colors.Gray10}]}>
              {nickname}
            </Text>
            <Text style={[textStyles.C4, {color: colors.Gray05}]}>
              {'차종,경력,성별,나이'}
            </Text>
            <Text style={[textStyles.C4, {color: colors.Gray08}]}>
              {'소개글'}
            </Text>
          </View>
          <View style={{flex: 1}}/> 
          <Text style={{fontFamily: 'SUIT-Bold', color:colors.Gray03, fontSize:20}}>
            {'>'}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={{height: 8}} />
      <View
        style={{
          padding: 16,
          margin: 16,
          backgroundColor: colors.white,
          borderRadius: 20,
          elevation: 2,
        }}>
        <View style={{flexDirection:'row'}}> 
          <Text style={[textStyles.B3, {color: colors.Gray10}]}>
            나의 드라이브 태그
          </Text>
          <View style={{flex:1}}/>
          <TouchableOpacity onPress={()=> navigation.navigate('MyDriveTagEdit')}>
            <Text style={[textStyles.B4, {color: colors.Gray05}]}>
              수정
            </Text>
          </TouchableOpacity>
        </View> 
        <View style={{height: 16}} />
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {item.tags.map((tag, index) => (
            <View
              key={index}
              style={{
                alignSelf: 'flex-start',
                paddingVertical:8,
                paddingHorizontal: 16,
                borderRadius: 24,
                justifyContent: 'center',
                marginRight: 8,
                marginBottom: 8,
                backgroundColor: colors.Light_Blue,
              }}>
              <Text style={[textStyles.B4, {color: colors.Blue}]}>
                {tag}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View
        style={{
          flex: 1,
          margin: 16,
          backgroundColor: colors.white,
          borderRadius: 20,
          flexDirection: 'row',
          alignItems: 'center',
          elevation: 2,
        }}>
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center', paddingVertical: 16}}
          onPress={() => navigation.navigate('MyScrap')}>
          <ScrapIcon />
          <View style={{height: 16}} />
          <Text style={[textStyles.B3, {color: colors.Gray10}]}>내 스크랩</Text>
        </TouchableOpacity>
        <View style={{width: 1, height: 39, backgroundColor: colors.Gray02}} />
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center', paddingVertical: 16}}
          onPress={() => navigation.navigate('MyReview')}>
          <ReviewIcon />
          <View style={{height: 16}} />
          <Text style={[textStyles.B3, {color: colors.Gray10}]}>내 리뷰</Text>
        </TouchableOpacity>
        <View style={{width: 1, height: 39, backgroundColor: colors.Gray02}} />
        <TouchableOpacity
          style={{flex: 1, alignItems: 'center', paddingVertical: 16}}>
          <DriveHistoryIcon />
          <View style={{height: 16}} />
          <Text style={[textStyles.B3, {color: colors.Gray10}]}>
            드라이브 기록
          </Text>
        </TouchableOpacity>
      </View>
      <Text>My Page</Text>
      <Button title="Logout" onPress={handleLogout} />
    </ScrollView>
  );
};

export default MyPage;
