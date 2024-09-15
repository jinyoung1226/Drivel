import { AppleButton } from '@invertase/react-native-apple-authentication';
import { textStyles } from '../styles/textStyles';
import { View } from 'react-native';

const AppleLogin = ({handleSignInApple}) => {

  return (
    <View style={{borderRadius:10, overflow: 'hidden'}}>
      <AppleButton
        buttonStyle={AppleButton.Style.BLACK}
        buttonType={AppleButton.Type.SIGN_IN}
        style={{
          width: '100%', // You must specify a width
          height: 50, // You must specify a height
          backgroundColor: 'black',
        }}
        textStyle={[textStyles.H4, {
          color: 'white',
        }]}
        onPress={handleSignInApple}
      />
    </View>
  );
}

export default AppleLogin;