import React from 'react';
import {View, Text} from 'react-native';
import colors from '../../styles/colors';
import {textStyles} from '../../styles/textStyles';
import LinearGradient from 'react-native-linear-gradient';

const UserMannerScoreBar = () => {
  return (

    <View 
      style={{
        flex: 1,
        marginHorizontal: 16,
        backgroundColor: colors.white,
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.1,
        shadowRadius: 3,
        padding:16
      }}
    >
      <View style={{flexDirection:'row'}}>
        <Text style={[textStyles.B3, {color:colors.Gray10}]}>
          매너 연료
        </Text>
        <View style={{width:4}}/>
        <Text style={[textStyles.C1, {color:colors.Blue}]}>
            {'30'}L
        </Text>
      </View>
      <View style={{height:8}}/>
      <View style={{flexDirection:'row', alignItems:'center', paddingVertical:8}}>
        <Text style={[textStyles.H6, {color:colors.Gray06, marginRight:8}]}>
          E
        </Text>

        <View style={{flex:1, height:8, borderRadius:100, backgroundColor: colors.Gray02, flexDirection:'row'}}>
          <LinearGradient 
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={[
              '#509DF6',
              '#5168F6',
            ]} 
            style={{flex:1, borderRadius:100}}
          />
          <View style={{flex:1}}/>
          {/* 이부분은 100분의 연료 비율로 처리 */}
        </View>
        <Text style={[textStyles.H6, {color:colors.Gray06, marginLeft:8}]}>
          F
        </Text>  
      </View>
    </View>
  );
}

export default UserMannerScoreBar;