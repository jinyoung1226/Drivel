import React, {useState} from 'react';
import GrayLine from '../../components/GrayLine';
import {View, Text, Pressable, TextInput, Image} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import NoneStar from '../../assets/icons/NoneStar.svg';
import Pencil from '../../assets/icons/Pencil.svg';
import Star from '../../assets/icons/Star.svg';
import Camera from '../../assets/icons/Camera.svg';
import {launchImageLibrary} from 'react-native-image-picker';
import ReviewPhotoXButton from '../../assets/icons/ReviewPhotoXButton.svg';
import {formDataApi} from '../../api/api';

const MAX_REVIEW_LENGTH = 200; // 리뷰 최대 글자 수

const DriveReview = ({item}) => {
  const tabName = ['방문자', '블로그'];
  const [activeTab, setActiveTab] = useState(0);
  const [rating, setRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [photoLimitMessage, setPhotoLimitMessage] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [visibleWriteReview, setVisibleWriteReview] = useState(false);
  const [photo, setPhoto] = useState([]);
  console.log(photo, '@@@@@');

  // const formData = new FormData();
  // // console.log(formData);

  // const reviewData = {
  //   courseId: item.id,
  //   rating: rating,
  //   comment: reviewText,
  // };

  // formData.append('review', JSON.stringify(reviewData));
  // console.log(formData);

  // photo.forEach((p, index) => {
  //   formData.append('images', {
  //     uri: p.uri,
  //     type: p.type,
  //     name: p.fileName,
  //   });
  // });
  // console.log(formData);

  // const uploadReview = async () => {
  //   const formData = new FormData();

  //   const reviewData = {
  //     courseId: item.id,
  //     rating: rating,
  //     comment: reviewText,
  //   };

  //   const review = JSON.stringify(reviewData)
  //   formData.append('review', review);

  //   // 이미지 파일들을 FormData에 추가
  //   photo.forEach((p, index) => {
  //     formData.append('images', {
  //       uri: p.uri,
  //       type: p.type,
  //       name: p.fileName,
  //     });
  //   });

  //   try {
  //     const response = await formDataApi.post('/review/add', {
  //       body: formData,
  //     });

  //     if (response.status === 200) {
  //       console.log(response);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  const handlePress = index => {
    setActiveTab(index);
  };

  const handleReviewPress = () => {
    setVisibleWriteReview(!visibleWriteReview);
  };

  const handleTextChange = text => {
    if (text.length > MAX_REVIEW_LENGTH) {
      setErrorMessage('최대 200자까지 입력 가능합니다');
    } else {
      setErrorMessage('');
    }
    setReviewText(text);
  };

  const renderStars = () => {
    let stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Pressable key={i} onPress={() => setRating(i)}>
          {i <= rating ? <Star /> : <NoneStar />}
        </Pressable>,
      );
    }
    return stars;
  };

  const getPhoto = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 3,
      });
      if (result.didCancel) {
        return;
      }
      // 현재 사진 개수와 선택한 사진 개수의 합이 3 이하일 때만 추가
      if (photo.length + result.assets.length <= 3) {
        setPhoto(prev => [...prev, ...result.assets]);
        setPhotoLimitMessage('');
      } else {
        setPhotoLimitMessage('최대 3장까지 첨부 가능합니다');
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calculateHeight = () => {
    if (photo.length > 0 && errorMessage && photoLimitMessage) {
      return 261.62;
    } else if (photo.length > 0 && errorMessage) {
      return 241.62;
    } else if (photo.length > 0) {
      return 211.62;
    } else if (errorMessage) {
      return 211.62;
    } else {
      return 181.62;
    }
  };

  const photoDelete = index => {
    setPhoto(prevPhotos => {
      const updatedPhotos = [...prevPhotos];
      updatedPhotos.splice(index, 1);
      return updatedPhotos;
    });
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
      <View
        style={{
          height: 17,
          marginTop: 24,
          paddingHorizontal: 24,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          <Star />
          <Text style={[textStyles.H5, {color: colors.Gray07, paddingLeft: 8}]}>
            {item.averageRating}
          </Text>
          <Text style={[textStyles.B3, {color: colors.Gray04, paddingLeft: 8}]}>
            {item.reviewCount}개 리뷰
          </Text>
        </View>
        <View>
          <Pressable style={{flexDirection: 'row'}} onPress={handleReviewPress}>
            <Pencil />
            <Text style={[textStyles.B3, {color: colors.Blue, paddingLeft: 5}]}>
              리뷰 쓰기
            </Text>
          </Pressable>
        </View>
      </View>
      {visibleWriteReview ? (
        <>
          <View
            style={{
              flex: 1,
              backgroundColor: colors.Gray01,
              borderRadius: 14,
              marginHorizontal: 16,
              marginTop: 16,
              padding: 16,
              height: calculateHeight(),
              justifyContent: 'top',
              alignItems: 'center',
            }}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <Text style={[textStyles.B4, {color: colors.Gray06}]}>
                해당 코스는 어떠셨나요?
              </Text>
              <View style={{flexDirection: 'row', marginTop: 8, gap: 8}}>
                {renderStars()}
              </View>
            </View>
            <View
              style={{
                flex: 1,
                height: photo.length > 0 ? 136 : 86,
                width: '100%',
                padding: 16,
                backgroundColor: colors.white,
                marginTop: 16,
                borderRadius: 10,
              }}>
              <TextInput
                style={{flex: 1, textAlignVertical: 'top'}}
                placeholder="댓글을 남겨주세요"
                maxLength={MAX_REVIEW_LENGTH + 1}
                onChangeText={text => handleTextChange(text)}
                value={reviewText}
                multiline
                numberOfLines={4}
              />
              <View style={{height: 16}} />
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 8,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Pressable onPress={getPhoto}>
                    <Camera />
                  </Pressable>
                  {photo.length > 0 && (
                    <View style={{flexDirection: 'row'}}>
                      {photo.map((p, index) => (
                        <View
                          key={index}
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                          }}>
                          <Image
                            key={index}
                            source={{uri: p.uri}}
                            style={{
                              width: 48,
                              height: 48,
                              marginLeft: 12,
                              borderRadius: 7.38,
                            }}
                          />
                          <Pressable
                            style={{
                              position: 'absolute',
                              bottom: 30.4,
                              left: 48.4,
                            }}
                            onPress={() => photoDelete(index)}>
                            <ReviewPhotoXButton />
                          </Pressable>
                        </View>
                      ))}
                    </View>
                  )}
                </View>
                <Pressable onPress={() => uploadReview()}>
                  <Text
                    style={
                      reviewText.length > 0 || photo.length > 0
                        ? [textStyles.B3, {color: colors.Blue}]
                        : [textStyles.B3, {color: colors.Gray06}]
                    }>
                    등록
                  </Text>
                </Pressable>
              </View>
              {errorMessage ? (
                <Text style={[textStyles.H6, {color: colors.red}]}>
                  {errorMessage}
                </Text>
              ) : null}
              {photoLimitMessage ? (
                <Text style={[textStyles.H6, {color: colors.red}]}>
                  {photoLimitMessage}
                </Text>
              ) : null}
            </View>
          </View>
          <View style={{height: 60, marginTop: 16, paddingHorizontal: 32}}>
            <Text style={[textStyles.B4, {color: colors.Gray04}]}>
              * 커뮤니티 이용 규칙에 벗어나는 리뷰글은 사전 고지 없이 삭제될 수
              있으며, 서비스 이용이 일정 기간 제한될 수 있어요.
            </Text>
          </View>
        </>
      ) : null}
    </View>
  );
};

export default DriveReview;
