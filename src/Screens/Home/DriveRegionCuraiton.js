import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import CurationButton from './CurationButton';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import CurationListItem from './CurationListItem';

const DriveRegionCuraiton = ({
  activeButton,
  category,
  handleButtonPress,
  data
}) => {
  const nickname = useSelector(state => state.auth.nickname);
  return (
    <View
      style={{
        flex: 1,
        paddingTop: 29.5,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          paddingLeft: 16,
        }}>
        <Text style={[textStyles.H2, {color: colors.Gray10}]}>
          {'👀 '} {nickname}님의 활동지역 근처 인기코스에요
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          gap: 8,
          paddingTop: 16,
        }}>
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
      <View style={{flex: 1, paddingTop: 16}}>
        <View style={{flexDirection: 'row'}}>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <CurationListItem item={item}/>
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

export default DriveRegionCuraiton;
