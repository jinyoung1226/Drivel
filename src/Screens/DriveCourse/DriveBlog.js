import axios from 'axios';
import {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Dimensions,
  FlatList,
  Pressable,
  Linking,
} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import DriveBlogList from './DriveBlogList';
import config from '../../config/config';

const DriveBlog = ({item}) => {
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    const getBlog = async () => {
      try {
        const response = await axios.get(
          'https://openapi.naver.com/v1/search/blog.json',
          {
            params: {query: item.courseInfo.title},
            headers: {
              'X-Naver-Client-Id': config.NAVERBLOG_ID_KEY,
              'X-Naver-Client-Secret': config.NAVERBLOG_SECRET_KEY,
            },
          },
        );
        const newData = response.data.items.map((item, index) => ({
          ...item,
          id: index,
        }));
        console.log(newData);

        setBlogData(newData);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };
    getBlog();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        marginTop: 8,
      }}>
      {blogData ? (
        <FlatList
          scrollEnabled={false}
          key={blogData.id}
          data={blogData}
          renderItem={({item}) => <DriveBlogList item={item} />}
          showsHorizontalScrollIndicator={false}
        />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default DriveBlog;
