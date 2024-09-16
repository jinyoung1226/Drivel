import React, {useState, useEffect} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import DriveReviewList from './DriveReviewList';
import NoItemScreen from '../../components/NoItemScreen';
import BubbleIcon from '../../assets/icons/BubbleIcon.svg';
import { getDriveReviewList, getDriveReviewListMore } from '../../features/drive/driveActions';
const MAX_REVIEW_LENGTH = 200; // 리뷰 최대 글자 수

const DriveReviewWrite = ({item, userId, scrollToTab}) => {
  const [rating, setRating] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [photoLimitMessage, setPhotoLimitMessage] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [visibleWriteReview, setVisibleWriteReview] = useState(false);
  const [photo, setPhoto] = useState([]);
  const [photoButtonDisabled, setPhotoButtonDisabled] = useState(false);
  const [uploadReviewButtonDisabled, setUploadReviewButtonDisabled] = useState(false);
  const dispatch = useDispatch();
  const {averageRating, reviewTotalElements, initialPage, driveReviewList, isReviewLastPage, isLoading, reviewCurrentPage} = useSelector(state => state.drive);
  
  const updateCourseInfo = () => {
    dispatch(getDriveReviewList({
      id: item.courseInfo.id,
      page: initialPage,
      size: 10,
    }));
  }
  
  const handleSeeMoreButton = () => {
    if (!isReviewLastPage) {
      dispatch(
        getDriveReviewListMore({
          id: item.courseInfo.id,
          page: reviewCurrentPage + 1,
          size: 10,
        }),
      );
    }
  };

  const uploadReview = async () => {
    setUploadReviewButtonDisabled(true)
    const formData = new FormData();

    formData.append('comment', reviewText);
    formData.append('courseId', item.courseInfo.id);
    formData.append('rating', rating);

    if (photo && photo.length > 0) {
      photo.forEach((image, index) => {
        formData.append('images', {
          uri: image.uri,
          type: image.type,
          name: image.fileName || `image_${index}.jpg`,
        });
      });
    }

    try {
      const response = await formDataApi.post('/review/add', formData);
      if (response.status === 200) {
        // 리뷰 업로드 후 courseInfo 업데이트
        dispatch(getDriveReviewList({
          id: item.courseInfo.id,
          page: initialPage,
          size: 10,
        }));
        // getReview(); // 리뷰 목록 갱신
        setUploadReviewButtonDisabled(false);
      }
    } catch (error) {
      console.error('Error:', error);
      console.log(error.response.data.message);
      setUploadReviewButtonDisabled(false);
    }

    handleReviewPress(); // 리뷰 작성 창 닫기
  };

  const handleReviewPress = () => {
    setVisibleWriteReview(!visibleWriteReview);
    if (!visibleWriteReview && scrollToTab) {
      scrollToTab();
    }
    setRating(0);
    setReviewText('');
    setPhoto([]);
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
    setPhotoButtonDisabled(true);
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 3,
      });
      if (result.didCancel) {
        setPhotoButtonDisabled(false);
        return;
      }
      // 현재 사진 개수와 선택한 사진 개수의 합이 3 이하일 때만 추가
      if (photo.length + result.assets.length <= 3) {
        setPhoto(prev => [...prev, ...result.assets]);
        setPhotoLimitMessage('');
        setPhotoButtonDisabled(false);
      } else {
        setPhotoLimitMessage('최대 3장까지 첨부 가능합니다');
        setPhotoButtonDisabled(false);
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
            {averageRating}
          </Text>
          <Text style={[textStyles.B3, {color: colors.Gray04, paddingLeft: 8}]}>
            {reviewTotalElements}개 리뷰
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
                paddingTop: 8,
                paddingBottom: 3,
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
                  <Pressable onPress={getPhoto} style={({pressed}) => [{backgroundColor: pressed ? colors.Gray03 : null, padding:5, borderRadius:30}]} disabled={photoButtonDisabled}>
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
                <Pressable 
                  style={({pressed}) => [{backgroundColor: pressed ? colors.Gray03 : null, padding:5, borderRadius:10}]}
                  onPress={() => uploadReview(item.courseInfo)}
                  disabled={uploadReviewButtonDisabled || rating == 0}
                  >
                  <Text
                    style={
                      rating > 0 && !uploadReviewButtonDisabled 
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
      
      {driveReviewList.length == 0 ? (
        <NoItemScreen
          text={'아직 리뷰가 없어요\n방문 후에 첫 리뷰를 남겨보세요'}
          icon={<BubbleIcon />}
        />
      ) : (
        <View style={{flex: 1, paddingHorizontal: 16}}>
          <DriveReviewList
            data={driveReviewList}
            userId={userId}
            updateCourseInfo={updateCourseInfo}
          />
          {isLoading &&
          <View style={{flex: 1, paddingHorizontal: 16}}>
          {[1,2,3,4].map((i) => (
            <View
            key={i}
            style={{
              height:150,
              borderRadius: 14,
              backgroundColor: colors.Gray02,
              marginBottom: 16,
              padding: 16,
            }}>
              <View style={{height: 6}}/>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                }}>
                <View style={{width:44, height:44, borderRadius:22, backgroundColor:colors.Gray04}}/>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
                  <View style={{height: 12, width:20, backgroundColor:colors.Gray04, borderRadius:5}}/>
                  <View style={{height: 10}}/>
                  <View style={{height: 12, width:40, backgroundColor:colors.Gray04, borderRadius:5}}/>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    </View>
                </View>
              </View>
              <View style={{height: 16}}/>
              <View>
                <View style={{flexDirection: 'row', gap: 5}}>
                  {[1,2,3,4,5].map((i) => (
                    <View style={{width: 16, height: 16, backgroundColor: colors.Gray04, borderRadius: 8}} />
                  ))}
                </View>
              </View>
              <View style={{height: 16}}/>
              <View style={{flex:1}}>
              <View style={{height: 20, width:200, backgroundColor:colors.Gray04, borderRadius:5}}/>
              </View>
            </View>))}
          </View>}
          {!isReviewLastPage && !isLoading && 
          <View style={{alignItems:'center'}}>
            <Pressable 
              onPress={handleSeeMoreButton}
              style={({pressed}) => [{backgroundColor: pressed ? colors.Light_Blue : colors.Light_Blue , borderRadius:10,  paddingVertical: 10, paddingHorizontal:16, borderRadius: 10}]}    
            >
              <Text style={[textStyles.H4, {color: colors.Blue}]}>더보기</Text>
            </Pressable>
            <View style={{height: 16}} />
          </View>
          }
          
        </View>
      )
      }
    </>
  );
};

export default DriveReviewWrite;
