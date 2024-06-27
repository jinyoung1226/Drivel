import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import {useSelector} from 'react-redux';
import Pin from '../../assets/Icon/roundPushpin.svg';
import CurationButton from './CurationButton';
import CurationList from './CurationList';

const DriveCourseCuration = ({
  activeButton,
  handleButtonPress,
  handleDriveCourse,
  category,
  filteredDriveCourses,
}) => {
  const nickname = useSelector(state => state.auth.nickname);
  return (
    <View style={styles.preferenceContainer}>
      <View style={styles.preferenceTextContainer}>
        <Pin />
        <Text style={styles.preferenceText}>
          {nickname}님의 취향을 담았어요
        </Text>
      </View>
      <View style={styles.recommendationContainer}>
        <FlatList
          data={category}
          renderItem={({item}) => (
            <CurationButton
              item={item}
              activeButton={activeButton}
              handleButtonPress={handleButtonPress}
            />
          )}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={<View style={{width: 8}} />}
          ListHeaderComponent={<View style={{width: 16}} />}
        />
      </View>
      <View style={{flex: 1, marginTop: 16}}>
        <View style={{flexDirection: 'row'}}>
          <FlatList
            data={filteredDriveCourses}
            renderItem={({item}) => (
              <CurationList item={item} handleDriveCourse={handleDriveCourse} />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={<View style={{width: 16}} />}
            ListHeaderComponent={<View style={{width: 16}} />}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  preferenceContainer: {
    height: 330,
    marginTop: 32,
  },

  preferenceTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 16,
    marginLeft: 16,
  },

  preferenceText: {
    fontFamily: 'SUIT-Bold',
    fontSize: 20,
    color: '#000000',
  },

  recommendationContainer: {
    flexDirection: 'row',
    gap: 8,
  },

  Pressable: {
    flex: 1,
  },
});

export default DriveCourseCuration;
