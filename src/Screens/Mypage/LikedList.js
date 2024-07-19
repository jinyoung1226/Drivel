import React from 'react';
import {FlatList, View} from 'react-native';
import LikedItem from './LikedItem';
const LikedList = ({goDriveDetail, ListHeaderComponent, data}) => {
  return (
    <FlatList
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={<View style={{height: 16}} />}
      ItemSeparatorComponent={<View style={{height: 16}} />}
      columnWrapperStyle={{
        justifyContent: 'space-between',
        marginHorizontal: 16,
      }}
      data={data}
      numColumns={2}
      renderItem={({item}) => (
        <LikedItem item={item} goDriveDetail={goDriveDetail} />
      )}
      keyExtractor={item => item.id}
    />
  );
};
export default LikedList;
