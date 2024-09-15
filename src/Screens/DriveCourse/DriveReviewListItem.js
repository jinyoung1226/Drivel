import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Pressable, FlatList, Dimensions} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import Star from '../../assets/icons/Star.svg';
import ThreeDot from '../../assets/icons/ThreeDot.svg';
import NoneStar from '../../assets/icons/NoneStar.svg';
import {useNavigation} from '@react-navigation/native';
import ConfirmModal from '../../components/ConfirmModal';
import formatChatTimestamp from '../../utils/formatChatTimeStamp';

const DriveReviewListItem = ({
  item,
  userId,
  selectedReview,
  setSelectedReview,
  updateCourseInfo,
}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [targetReviewId, setTargetReviewId] = useState(null);
  const width = Dimensions.get('window').width;
  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <View key={i}>{i <= item.rating ? <Star /> : <NoneStar />}</View>,
      );
    }
    return stars;
  };
  console.log(item);
  const toggleOptions = () => {
    if (selectedReview === item.id) {
      setSelectedReview(null);
    } else {
      setSelectedReview(item.id);
    }
  };

  const openDeleteModal = () => {
    setModalType('reviewDelete');
    setTargetReviewId(item.id);
    setModalVisible(true);
  };

  const openBlockModal = () => {
    setModalType('userReviewBlock');
    setTargetReviewId(item.reviewerId);
    setModalVisible(true);
  };

  const renderItem = ({item: image, index}) => (
    <View style={{backgroundColor:colors.Gray01}}>
      <Image
        key={index}
        source={{uri: image.imagePath}}
        style={{width: 150, height: 150, borderRadius: 5, resizeMode: 'cover'}}
      />
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        borderRadius: 14,
        backgroundColor: colors.Gray02,
        paddingBottom: 16,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 16,
          gap: 8,
        }}>
        <Image
          source={{uri: item.reviewerImagePath}}
          style={{borderRadius: 22, width: 44, height: 44}}
        />
        <View style={{flex: 1, flexDirection: 'column', gap: 4}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={[textStyles.H5, {color: colors.Blue}]}>
              {item.reviewerNickname}
            </Text>
            <TouchableOpacity onPress={toggleOptions}>
              <ThreeDot />
            </TouchableOpacity>
          </View>
          <Text style={[textStyles.B4, {color: colors.Gray06}]}>
            {formatChatTimestamp(item.reviewDate)}
          </Text>
        </View>
      </View>
      <View style={{paddingHorizontal: 16}}>
        <View style={{flexDirection: 'row', gap: 5}}>{renderStars()}</View>
        <View style={{height: 10}} />
        <Text style={[textStyles.C4, {color: colors.Gray10}]}>
          {item.comment}
        </Text>
      </View>
      <View style={{height: 16}} />

      {/* 이미지 수평 스크롤 */}
      {item.images.length > 0 && (
        <View>
          <FlatList
            ListHeaderComponent={() => <View style={{width: 16}} />}
            ListFooterComponent={() => <View style={{width: 16}} />}
            data={item.images}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{width: 8}} />}
          />
        </View>
      )}

      {/* 수정하기와 삭제하기 버튼 */}
      {selectedReview === item.id && userId === item.reviewerId && (
        <View
          style={{
            position: 'absolute',
            top: 44,
            right: 16,
          }}>
          <Pressable
            style={({pressed}) => [
              {
                paddingHorizontal: 16,
                paddingVertical: 8,
                backgroundColor: pressed ? colors.Gray02 : colors.white,
              },
            ]}
            onPress={openDeleteModal}>
            <Text style={[textStyles.B4, {color: colors.Gray10}]}>
              삭제하기
            </Text>
          </Pressable>
        </View>
      )}
      {/* 신고하기와 차단하기 버튼 */}
      {selectedReview === item.id && userId !== item.reviewerId && (
        <View
          style={{
            position: 'absolute',
            top: 44,
            right: 16,
          }}>
          <Pressable
            style={({pressed}) => [
              {
                paddingHorizontal: 16,
                paddingVertical: 8,
                backgroundColor: pressed ? colors.Gray02 : colors.white,
              },
            ]}
            onPress={() => {
              navigation.navigate('ReportPage', {userId: item.reviewerId});
            }}>
            <Text style={[textStyles.B4, {color: colors.Gray10}]}>
              신고하기
            </Text>
          </Pressable>
          <Pressable
            style={({pressed}) => [
              {
                paddingHorizontal: 16,
                paddingVertical: 8,
                backgroundColor: pressed ? colors.Gray02 : colors.white,
              },
            ]}
            onPress={openBlockModal}>
            <Text style={[textStyles.B4, {color: colors.Gray10}]}>
              차단하기
            </Text>
          </Pressable>
        </View>
      )}

      {/* 모달 */}
      <ConfirmModal
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        type={modalType}
        updateCourseInfo={updateCourseInfo}
        targetId={targetReviewId}
      />
    </View>
  );
};

export default DriveReviewListItem;
