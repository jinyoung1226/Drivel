import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import DatePicker from './DatePicker';
import {textStyles} from '../styles/textStyles'; // 본인의 경로로 수정 필요
import colors from '../styles/colors'; // 본인의 경로로 수정 필요
import BigXIcon from '../assets/icons/BigXIcon'; // 본인의 경로로 수정 필요
import CustomButton from './CustomButton';
const DatePickerModal = ({visible, onClose, onSelect}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isPastDate, setIsPastDate] = useState(false);

  useEffect(() => {
    const today = new Date();
    const isPast = selectedDate < today.setHours(0, 0, 0, 0); // 현재 날짜와 시간 비교
    setIsPastDate(isPast);
  }, [selectedDate]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <View style={{width: 24}} />
            <View style={{flex: 1}} />
            <Text style={[textStyles.H4, {color: colors.Gray10, height: 20}]}>
              날짜 선택하기
            </Text>
            <View style={{flex: 1}} />
            <TouchableOpacity onPress={onClose}>
              <BigXIcon />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: 16,
              borderBottomWidth: 1,
              borderColor: colors.Gray02,
            }}
          />
          <View style={{height: 16}} />
          <DatePicker value={selectedDate} onChange={setSelectedDate} />
          <View style={{height: 16}} />
          <CustomButton
            title="선택하기"
            onPress={() => onSelect(selectedDate)}
            disabled={isPastDate}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
    padding: 32,
  },
  modalView: {
    width: '100%',
    backgroundColor: colors.BG,
    borderRadius: 20,
    padding: 16,
  },
});

export default DatePickerModal;
