import React from "react";
import { Modal, View, ActivityIndicator } from "react-native";

const LoadingModal = ({ modalVisible, backgroundColor='rgba(0, 0, 0, 0.5)' }) => {
  return (
  <Modal
      animationType="none"
      transparent={true}
      visible={modalVisible}
    >
      <View style={{ flex: 1, backgroundColor: backgroundColor , justifyContent:'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
      </View>
    </Modal>
  )
};
export default LoadingModal;
