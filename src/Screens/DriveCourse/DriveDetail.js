import {React, useEffect} from 'react';
import {View, Text, Button, Image, StyleSheet, Dimensions} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import {ScrollView} from 'react-native-gesture-handler';
import DriveCourseInfoTab from './DriveCourseInfoTab';
const DriveDetail = () => {
  const driveInfo = useSelector(state => state.drive.driveInfo);
  console.log(driveInfo);
  const theme = ['노을 맛집', '해변길', '타다끼', '김수환 성적 a3,c3 ㅋㅋ'];

  const {width} = Dimensions.get('window');

  return (
    <ScrollView style={styles.container}>
      <Image
        source={(source = {url: driveInfo.courseInfo.imagePath})}
        style={[styles.image, {width: width}]}
      />
      <View style={styles.tagContainer}>
        {theme.map((item, index) => (
          <View style={styles.tagButton}>
            <Text style={styles.tagText}>{item}</Text>
          </View>
        ))}
      </View>
      <View style={{paddingHorizontal: 16, marginTop: 16}}>
        <Text style={[textStyles.H1, {color: colors.Gray10}]}>
          {driveInfo.courseInfo.name}
        </Text>
        <View style={{height: 8}} />
        <Text style={[textStyles.M14, {color: colors.Gray07}]}>
          {driveInfo.courseInfo.description}
        </Text>
      </View>
      <View style={styles.bar}></View>
      <DriveCourseInfoTab />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },

  image: {
    height: 210.94,
  },

  tagContainer: {
    marginTop: 16.06,
    paddingHorizontal: 16,
    height: 30,
    flexDirection: 'row',
    justifyContent: 'left',
    gap: 4,
  },

  tagButton: {
    paddingHorizontal: 10,
    height: 30,
    backgroundColor: '#E3E7FF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tagText: [textStyles.B2, {color: colors.Blue}],

  bar: {
    height: 10,
    marginTop: 17,
    backgroundColor: '#F6F6F7',
  },
});

export default DriveDetail;
