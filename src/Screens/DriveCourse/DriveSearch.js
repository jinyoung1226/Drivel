// DriveSearch.js
import React, { useEffect, useRef, useState } from 'react';
import { View, Text } from 'react-native';
import colors from '../../styles/colors';
import BackIcon from '../../assets/icons/BackIcon';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import SmallSearchIcon from '../../assets/icons/SmallSearchIcon';
import { api } from '../../api/api';
import koFilter from '../../utils/koFilter';
import DriveSearchCustomInput from './DriveSearchCustomInput';
import XIcon from '../../assets/icons/XIcon.svg';
import BigXIcon from '../../assets/icons/BigXIcon.svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DriveSearchCourseListItem from './DriveSearchCourseListItem';
import { SafeAreaView } from 'react-native-safe-area-context';
import { textStyles } from '../../styles/textStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ClockIcon from '../../assets/icons/ClockIcon.svg';
const DriveSearch = ({ navigation }) => {
  
  const [courses, setCourses] = useState([]);
  const [driveCourse, setDriveCourse] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [searchHistory, setSearchHistory] = useState([]);

  // ref 생성
  const inputRef = useRef(null);

  const getDriveCourseList = async () => {
    try {
      const response = await api.get(
        'https://drivel-course-data.s3.ap-northeast-2.amazonaws.com/course-data',
      );
      if (response.status === 200) {
        // console.log(response.data.courses);
        setCourses(response.data.courses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getSearchHistory = async () => {
    const searchHistoryData = await AsyncStorage.getItem('searchHistory');
    if (searchHistoryData) {
      setSearchHistory(JSON.parse(searchHistoryData));
      console.log(searchHistoryData);
    }
  };
    
  useEffect(() => {
    getDriveCourseList();
    getSearchHistory();
  }, []);


  // 컴포넌트 마운트 후 인풋에 포커스 설정
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSearch = e => {
    setDriveCourse(e);
    setFilteredData(koFilter(courses, e));
  };

  const clearSearch = () => {
    setDriveCourse('');
    setFilteredData([]);
    // 포커스 다시 설정 (선택 사항)
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  const deleteSearchHistoryAll = async () => {
    setSearchHistory([]);
    await AsyncStorage.removeItem('searchHistory');
  }

  const deleteSearchHistory = async (id) => {
    console.log(id, "삭제할 ID");
    setSearchHistory(searchHistory.filter(item => item.id !== id));
    await AsyncStorage.setItem('searchHistory', JSON.stringify(searchHistory.filter(item => item.id !== id)));
    console.log(searchHistory, '히스토리 리스트');
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.BG }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          backgroundColor: colors.BG,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon color={colors.Gray10} />
        </TouchableOpacity>
        <View style={{ width: 8 }} />
        <View style={{ flex: 1 }}>
          <DriveSearchCustomInput
            autoFocus={true} 
            ref={inputRef} // ref 전달
            showButton={true}
            isButtonText={false}
            buttonIcon={
              driveCourse.length > 0 ? (
                <XIcon />
              ) : (
                <SmallSearchIcon color={colors.Gray04} />
              )
            }
            onButtonPress={clearSearch} // 검색어 클리어 함수 사용
            placeholder="원하는 드라이브코스를 검색해주세요"
            value={driveCourse}
            onChangeText={handleSearch}
            buttonDisabled={driveCourse.length === 0}
          />
        </View>
      </View>
      <View style={{ flex: 1 }}>
        <KeyboardAwareScrollView>
          {filteredData.length !== 0 && driveCourse.length !== 0 ?
            filteredData.map(item => (
              <View key={item.id}>
                <DriveSearchCourseListItem item={item} searchHistoryList={searchHistory} setSearchHistory={setSearchHistory}/>
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: colors.Gray02,
                  }}
                />
              </View>
            ))
            :
            <View style={{paddingHorizontal:24}}>
              <Text style={[textStyles.H4, {color:colors.Gray10}]}>Drivel 추천 코스</Text>
              <View style={{height: 16}} />
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {courses.sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 5).map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    alignSelf: 'flex-start',
                    height: 35,
                    paddingHorizontal: 16,
                    borderRadius: 24,
                    justifyContent: 'center',
                    marginRight: 8,
                    marginBottom: 8,
                    backgroundColor: colors.white,
                    borderWidth:1,
                    borderColor:colors.Gray03
                  }}
                  onPress={() => {setDriveCourse(item.title);
                    setFilteredData(koFilter(courses, item.title));
                  }}>
                  <Text style={[textStyles.B4, {color: colors.Gray10}]}>{item.title}</Text>
                </TouchableOpacity>
              ))}
              </View>
              <View style={{height: 16}} />
              {searchHistory.length !== 0 &&
              <View>
                <View style={{flexDirection: 'row', alignItems:'center'}}>
                  <Text style={[textStyles.H4, {color:colors.Gray10}]}>최근 검색</Text>
                  <View style={{flex: 1}} />
                  <TouchableOpacity
                    onPress={() => {deleteSearchHistoryAll()}}>
                    <Text style={[textStyles.H5, {color:colors.Gray07}]}>전체 삭제</Text>
                  </TouchableOpacity>
                </View>
                <View style={{height: 16}} />
                {searchHistory.map((item, index) => (
                  <View 
                    key={index}
                    style={{
                      alignItems: 'center',
                      flexDirection: 'row',
                      marginBottom:20
                    }}>
                    <TouchableOpacity
                      style={{
                        alignItems: 'center',
                        flexDirection: 'row',
                      }}
                      onPress={() => {setDriveCourse(item.title);
                        setFilteredData(koFilter(courses, item.title));
                      }}>
                      <ClockIcon/>
                      <View style={{width: 8}} />
                      <Text style={[textStyles.B2, {color: colors.Gray09}]}>{item.title}</Text>
                      
                    </TouchableOpacity>
                    <View style={{flex: 1}} />
                    <TouchableOpacity
                    style={{padding:4}}
                    onPress={() => {deleteSearchHistory(item.id)}}>
                      <BigXIcon width={16} height={16} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>}  
            </View>
          }
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DriveSearch;
