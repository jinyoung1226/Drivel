import React, {useState} from 'react';
import GrayLine from '../../components/GrayLine';
import {View, Text, Pressable, TextInput, Image} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import DriveReviewWrite from './DriveReviewWrite';
import DriveBlog from './DriveBlog';

const DriveReview = ({item}) => {
  const tabName = ['방문자', '블로그'];
  const [activeTab, setActiveTab] = useState(0);

  const handlePress = index => {
    setActiveTab(index);
  };

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
        {tabName.map((item, index) => (
          <Pressable onPress={() => handlePress(index)}>
            <View
              key={index}
              style={{
                borderRadius: 100,
                width: 64,
                height: 30,
                justifyContent: 'center',
                alignItems: 'center',
                borderWidth: activeTab === index ? 0 : 1,
                borderColor: colors.Gray03,
                backgroundColor: activeTab === index ? colors.Blue : null,
              }}>
              <Text
                style={[
                  textStyles.B4,
                  {
                    color:
                      activeTab === index ? colors.White_Blue : colors.Gray10,
                  },
                ]}>
                {item}
              </Text>
            </View>
          </Pressable>
        ))}
      </View>
      {activeTab === 0 ? (
        <DriveReviewWrite item={item} />
      ) : (
        <DriveBlog item={item} />
      )}
    </View>
  );
};

export default DriveReview;
