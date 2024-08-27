import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {View, Text, FlatList} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import RestaurantBlogList from './RestaurantBlogList';
import config from '../../config/config';

const RestaurantReviewTab = ({placeInfo}) => {
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios.get(
          'https://openapi.naver.com/v1/search/blog.json',
          {
            params: {query: placeInfo.name},
            headers: {
              'X-Naver-Client-Id': config.NAVERBLOG_ID_KEY,
              'X-Naver-Client-Secret': config.NAVERBLOG_SECRET_KEY,
            },
          },
        );
        const newData = response.data.items.map((item, index) => ({
          ...item,
          id: index.toString(), // 키로 사용하기 위해 문자열로 변환
        }));
        setBlogData(newData);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };
    getBlog();
  }, [placeInfo.name]);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 30,
          paddingLeft: 16,
          marginTop: 24,
          flexDirection: 'row',
          gap: 8,
        }}>
        <View
          style={{
            borderRadius: 100,
            width: 64,
            height: 30,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: colors.Gray03,
            backgroundColor: colors.Blue,
          }}>
          <Text
            style={[
              textStyles.B4,
              {
                color: colors.White_Blue,
              },
            ]}>
            블로그
          </Text>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          padding: 16,
          marginTop: 8,
        }}>
        {blogData ? (
          <FlatList
            data={blogData}
            renderItem={({item}) => <RestaurantBlogList item={item} />}
            keyExtractor={item => item.id} // keyExtractor 추가
            showsHorizontalScrollIndicator={false}
            scrollEnabled={false}
          />
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
    </View>
  );
};

export default RestaurantReviewTab;
