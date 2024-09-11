import React, {useState} from 'react';
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
import {authApi} from '../../api/api';
import DriveReviewList from './DriveReviewList';
import {max} from 'moment';
import NoItemScreen from '../../components/NoItemScreen';
import BubbleIcon from '../../assets/icons/BubbleIcon.svg';
const MAX_REVIEW_LENGTH = 200; // 리뷰 최대 글자 수

const DriveReviewWrite = ({item, updateCourseInfo, userId, scrollToTab}) => {
  const [rating, setRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [photoLimitMessage, setPhotoLimitMessage] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [visibleWriteReview, setVisibleWriteReview] = useState(false);
  const [photo, setPhoto] = useState([]);
  const [reviewList, setReviewList] = useState([]);

  const updateReviewInfo = async () => {
    try {
      const response = await authApi.get(
        `course/${item.courseInfo.id}/reviews`,
        {
          params: {
            page: 0, // 첫 번째 페이지
            size: max, // 불러올 리뷰 개수
          },
        },
      );
      if (response.status === 200) {
        setReviewList(response.data);
        setRating(0);
        setReviewText('');
        setPhoto([]);
      }
    } catch (error) {
      console.error('Error fetching updated review info:', error);
    }
  };

  // const getReview = async () => {
  //   try {
  //     const response = await authApi.get(
  //       `course/${item.courseInfo.id}/reviews`,
  //       {
  //         params: {
  //           page: 0, // 첫 번째 페이지
  //           size: max, // 불러올 리뷰 개수
  //         },
  //       },
  //     );
  //     if (response.status === 200) {
  //       console.log(response.data, 'ㄴㅇㄴㅇ');
  //       setReviewList(response.data);
  //       setRating(0);
  //       setReviewText('');
  //       setPhoto([]);
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };

  // useEffect(() => {
  //   getReview();
  // }, []);

  const uploadReview = async () => {
    const formData = new FormData();

    formData.append('comment', reviewText);
    formData.append('courseId', item.courseInfo.id);
    formData.append('rating', rating);

    if (photo.length > 0) {
      for (const image of photo) {
        const response = await fetch(image.uri);
        const blob = await response.blob();
        formData.append('images', blob, image.fileName);
      }
    }

    try {
      const response = await formDataApi.post('/review/add', formData);
      if (response.status === 200) {
        // 리뷰 업로드 후 courseInfo 업데이트
        updateCourseInfo();
        // getReview(); // 리뷰 목록 갱신
      }
    } catch (error) {
      console.error('Error:', error);
      console.log(error.response.data.message);
    }

    handleReviewPress(); // 리뷰 작성 창 닫기
  };

  const handleReviewPress = () => {
    setVisibleWriteReview(!visibleWriteReview);
    if (!visibleWriteReview && scrollToTab) {
      scrollToTab();
    }
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

  const photoDelete = index => {
    setPhoto(prevPhotos => {
      const updatedPhotos = [...prevPhotos];
      updatedPhotos.splice(index, 1);
      return updatedPhotos;
    });
  };

  return (
    <>
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
              backgroundColor: colors.Gray01,
              borderRadius: 14,
              marginHorizontal: 16,
              marginTop: 16,
              padding: 16,
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
                paddingHorizontal: 16,
                paddingVertical: 8,
                backgroundColor: colors.white,
                marginTop: 16,
                borderRadius: 10,
              }}>
              <TextInput
                style={{
                  color: colors.Gray10,
                  flex: 1,
                  textAlignVertical: 'top',
                }}
                placeholder="리뷰를 남겨주세요"
                placeholderTextColor={colors.Gray04}
                onChangeText={text => handleTextChange(text)}
                value={reviewText}
                multiline={true}
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
                <Pressable onPress={() => uploadReview(item.courseInfo)}>
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
      <View style={{height: 16}} />
      {item.reviews.length == 0 ? (
        <NoItemScreen
          text={'아직 리뷰가 없어요\n방문 후에 첫 리뷰를 남겨보세요'}
          icon={<BubbleIcon />}
        />
      ) : (
        <View style={{flex: 1, paddingHorizontal: 16}}>
          <DriveReviewList
            data={item.reviews}
            userId={userId}
            updateReviewInfo={updateReviewInfo}
            updateCourseInfo={updateCourseInfo}
          />
        </View>
      )}
    </>
  );
};

export default DriveReviewWrite;
