import React, {useLayoutEffect, useState} from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {textStyles} from '../../styles/textStyles';
import colors from '../../styles/colors';
import {FlatList} from 'react-native-gesture-handler';
import BackIcon from '../../assets/icons/BackIcon';
import ArrowIcon from '../../assets/icons/ArrowIcon';
import {helps} from '../../assets/helpData/helpData';

const Help = ({navigation}) => {
  const [selectedItems, setSelectedItems] = useState([]);

  const HelpListItem = ({item, onPress, id}) => {
    const isSelected = selectedItems.includes(id);

    return (
      <View
        style={{
          flex: 1,
          paddingHorizontal: 16,
          borderColor: colors.Gray03,
          borderRadius: 10,
          borderWidth: 1,
          marginHorizontal: 16,
          marginBottom: 16,
        }}>
        <TouchableOpacity
          onPress={onPress}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <View style={{flex: 1}}>
            <Text style={[textStyles.H5, {color: colors.Gray10}]}>
              {item.title}
            </Text>
          </View>
          <View style={{width: 16}} />
          <View>
            <ArrowIcon
              width={24}
              height={24}
              transform={[{rotate: isSelected ? '-90deg' : '90deg'}]}
            />
          </View>
        </TouchableOpacity>
        {isSelected && (
          <View>
            <View style={{height: 1, backgroundColor: colors.Gray03}} />
            <View style={{paddingVertical: 16}}>
              <Text style={[textStyles.B4, {color: colors.Gray07}]}>
                {item.content}
              </Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  const toggleItem = id => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

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

  return (
    <View style={{backgroundColor: colors.BG, flex: 1}}>
      <FlatList
        ListHeaderComponent={<View style={{height: 16}} />}
        data={helps}
        renderItem={({item}) => (
          <HelpListItem
            item={item}
            onPress={() => {
              toggleItem(item.id);
            }}
            id={item.id}
          />
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default Help;
