import { AppleButton } from '@invertase/react-native-apple-authentication';
import { textStyles } from '../styles/textStyles';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppleLogo from '../assets/icons/AppleLogo';
import colors from '../styles/colors';
const AppleLogin = ({handleSignInApple}) => {

  return (
    <View style={{borderRadius:10, overflow: 'hidden'}}>
      <TouchableOpacity
        style={{
          width: '100%', // You must specify a width
          height: 50, // You must specify a height
          backgroundColor: 'black',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
        onPress={handleSignInApple}
      >
        <AppleLogo width={20} height={20}/>
        <View style={{width: 6.6}} />
        <Text style={[textStyles.H4, {color:colors.white}]}>Apple로 로그인</Text>
      </TouchableOpacity>  
    </View>
  );
}

export default AppleLogin;