import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity, Pressable} from 'react-native';
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
  updateReviewInfo,
  updateCourseInfo,
}) => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [targetReviewId, setTargetReviewId] = useState(null);

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <View key={i}>{i <= item.rating ? <Star /> : <NoneStar />}</View>,
      );
    }
    return stars;
  };

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

  return (
    <View
      style={{
        flex: 1,
        borderRadius: 14,
        padding: 16,
        backgroundColor: colors.Gray01,
      }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
        }}>
        <Image
          source={{uri: item.reviewerImagePath}}
          style={{borderRadius: 49.96, width: 44, height: 44}}
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
      <View style={{height: 16}} />
      <View style={{flexDirection: 'row', gap: 5}}>{renderStars()}</View>
      <View style={{height: 10}} />
      <Text style={[textStyles.C4, {color: colors.Gray10}]}>
        {item.comment}
      </Text>
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
            ]}>
            <Text style={[textStyles.B4, {color: colors.Gray10}]}>
              수정하기
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
        updateReviewInfo={updateReviewInfo}
        updateCourseInfo={updateCourseInfo}
        targetId={targetReviewId}
      />
    </View>
  );
};

export default DriveReviewListItem;
