import React, {useState} from "react";
import { View, Text, TouchableOpacity } from "react-native";
import colors from "../../styles/colors";
import { textStyles } from "../../styles/textStyles";
import { useNavigation } from "@react-navigation/native";
import Tabs from "../../components/Tabs";
import ToggleSwitch from "../../components/TogleSwitch";
import MyMeetList from "./MyMeetList";


const data = [
  {meetingId: 78, courseId: 24,  meetingTitle:'모임 제목', date:'2021-09-01', imagePath:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'},
  {meetingId: 72, courseId: 22,  meetingTitle:'모임 제목모임 제목모임 제목모임 제목모임 제목모임 제목모임 제목모임 제목모임 제목모임 제목모임 제목모임 제목', date:'2021-09-01', imagePath:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'},
  {meetingId: 71, courseId: 25,  meetingTitle:'모임 제목', date:'2021-09-01', imagePath:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg'}
]

const MyMeetHistory = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState(0);
  return (
    <View style={{flex:1}}>
      <View style={{flexDirection:'row', padding:16, alignItems:'center'}}>
        <Text style={[textStyles.H3, {color:colors.Gray10}]}>모임 히스토리</Text>
        <View style={{flex:1}}/>
        <Text style={[textStyles.B5, {color:colors.Gray05}]}>다른 사용자에게 내 모임 정보를 공개해요</Text>
        <View style={{width:8}}/>
        <ToggleSwitch onPress={() => console.log('asdasd')}/>
      </View>
      <Tabs tabName={['만든 모임', '참여한 모임']} activeTab={activeTab} setActiveTab={setActiveTab}/>
      <View style={{height:24}}/>

      {activeTab == 0 && <MyMeetList data={data}/>}
    </View>
  );
}

export default MyMeetHistory;