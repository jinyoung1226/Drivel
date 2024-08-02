import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, Alert, Modal, Image} from 'react-native';
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
import { authApi, formDataApi } from '../../api/api';
import LinearGradient from 'react-native-linear-gradient';
import RenderingPage from '../../components/RenderingPage';
import { getMyProfileInfo } from '../../features/profile/profileActions';
import chageBrithToAge from '../../utils/changeBrithToAge';

const MyPage = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const myProfileInfo = useSelector(state => state.profile.myProfileInfo);
  const dispatch = useDispatch();

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
      navigation.navigate('SelectedProfileImage', {photo: result.assets[0]});
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  // const getMyProfileInfo = async () => {
  //   try {
  //     const response = await authApi.get('/profile/my');
  //     if (response.status == 200) {
  //       console.log(response.data);
  //       setMyProfileInfo(response.data);
  //     }
  //   } catch (error) {
  //     if (error.response) {
  //       Alert.alert(error.response.data.message);
  //     } else {
  //       console.log('서버 접속 오류');
  //     }   
  //   }
  // }
  
  useEffect(() => {
    dispatch(getMyProfileInfo());
  }, []);

  if (myProfileInfo === null) {
    return (
      <RenderingPage/>
    )
  }
  
  const handlePressMyInfo = () => {
    if (myProfileInfo.gender == null) {
      navigation.navigate('RequiredInfo');
    }
    if (myProfileInfo.gender !== null) {
      navigation.navigate('MyInfo', {item: myProfileInfo});
    }
  };

  const ProfileImageModal = () => {
    return (
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
    )
  }

  return (
    <ScrollView style={{backgroundColor: colors.BG}}>
      <ProfileImageModal/>
      <View style={{height: 32}} />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
        }}
      >
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
            <Image src={myProfileInfo.imagePath} style={{flex:1}}/>
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
          onPress={() => {handlePressMyInfo()}}
        >  
          <View style={{flex:1}}>
            <Text style={[textStyles.H2, {color: colors.Gray10}]}>
              {myProfileInfo.nickname}
            </Text>
            {myProfileInfo.gender !== null && <View>
              <Text style={[textStyles.C4, {color: colors.Gray05}]} numberOfLines={2}>
                {`${myProfileInfo.carModel} • 운전경력 ${myProfileInfo.carCareer}년\n${myProfileInfo.gender} • ${chageBrithToAge(myProfileInfo.birth)}세`}
              </Text>
              <Text style={[textStyles.C4, {color: colors.Gray08}]}>
                {myProfileInfo.description}
              </Text>
            </View>}
          </View>
          <View style={{width: 10}}/> 
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
          <TouchableOpacity onPress={()=> navigation.navigate('MyDriveTagEdit', {item: myProfileInfo})}>
            <Text style={[textStyles.B4, {color: colors.Gray05}]}>
              수정
            </Text>
          </TouchableOpacity>
        </View> 
        <View style={{height: 16}} />
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          {myProfileInfo.styles.concat(myProfileInfo.themes, myProfileInfo.togethers).map((item, index) => (
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
                {item.displayName}
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
      <View 
        style={{
          flex: 1,
          margin: 16,
          backgroundColor: colors.white,
          borderRadius: 10,
          elevation: 2,
          padding:16
        }}
      >
        <View style={{flexDirection:'row'}}>
          <Text style={[textStyles.B3, {color:colors.Gray10}]}>
            매너 연료
          </Text>
          <View style={{width:4}}/>
          <Text style={[textStyles.C1, {color:colors.Blue}]}>
              {'30'}L
          </Text>
        </View>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <Text style={[textStyles.H6, {color:colors.Gray06, marginRight:8}]}>
            E
          </Text>

          <View style={{flex:1, height:8, borderRadius:100, backgroundColor: colors.Gray02, flexDirection:'row'}}>
            <LinearGradient 
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={[
                '#509DF6',
                '#5168F6',
              ]} 
              style={{flex:1, borderRadius:100}}
            />
            <View style={{flex:1}}/>
            {/* 이부분은 100분의 연료 비율로 처리 */}
          </View>
          <Text style={[textStyles.H6, {color:colors.Gray06, marginLeft:8}]}>
            F
          </Text>  
        </View>
      </View>
    </ScrollView>
  );
};

export default MyPage;
