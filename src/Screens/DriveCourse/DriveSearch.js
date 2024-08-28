import {Text} from 'react-native';
import {View} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import BackIcon from '../../assets/icons/BackIcon';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import SmallSearchIcon from '../../assets/icons/SmallSearchIcon';
import {api} from '../../api/api';
import {useEffect, useState} from 'react';
import koFilter from '../../utils/koFilter';
import DriveSearchCustomInput from './DriveSearchCustomInput';
import SearchIcon from '../../assets/icons/SearchIcon.svg';
import XIcon from '../../assets/icons/XIcon.svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DriveSearchCourseListItem from './DriveSearchCourseListItem';
import { SafeAreaView } from 'react-native-safe-area-context';

const DriveSearch = ({navigation}) => {
  const [courses, setCourses] = useState([]);
  const [driveCourse, setDriveCourse] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const getDriveCourseList = async () => {
    try {
      const response = await api.get(
        'https://drivel-course-data.s3.ap-northeast-2.amazonaws.com/course-data',
      );
      if (response.status === 200) {
        setCourses(response.data.courses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDriveCourseList();
  }, []);

  const handleSearch = e => {
    setDriveCourse(e);
    setFilteredData(koFilter(courses, e));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.BG}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          backgroundColor: colors.BG,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon color={colors.Gray10} />
        </TouchableOpacity>
        <View style={{width:8}}/>
        <View style={{flex: 1}}>
          <DriveSearchCustomInput
            showButton={true}
            isButtonText={false}
            buttonIcon={
              driveCourse.length > 0 ? (
                <XIcon />
              ) : (
                <SmallSearchIcon color={colors.Gray04} />
              )
            }
            onButtonPress={() => {
              setDriveCourse('');
            }}
            placeholder="원하는 드라이브코스를 검색해주세요"
            value={driveCourse}
            onChangeText={handleSearch}
            buttonDisabled={driveCourse.length === 0}
          />
        </View>
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <KeyboardAwareScrollView>
          {filteredData.length !== 0 &&
            driveCourse.length !== 0 &&
            filteredData.map(item => (
              <View key={item.id}>
                <DriveSearchCourseListItem item={item}/>
                <View
                  style={{
                    borderBottomWidth: 2,
                    borderBottomColor: colors.Gray02,
                  }}
                />
              </View>
            ))}
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default DriveSearch;
