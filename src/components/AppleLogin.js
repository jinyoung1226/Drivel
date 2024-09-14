import { AppleButton } from '@invertase/react-native-apple-authentication';
import { textStyles } from '../styles/textStyles';

const AppleLogin = ({handleSignInApple}) => {

  return (
    <AppleButton
      buttonStyle={AppleButton.Style.BLACK}
      buttonType={AppleButton.Type.SIGN_IN}
      style={{
        width: '100%', // You must specify a width
        height: 50, // You must specify a height
        backgroundColor: 'black',
        borderRadius:10,
      }}
      textStyle={[textStyles.H4, {
        color: 'white',
      }]}
      onPress={handleSignInApple}
    />
  );
}

export default AppleLogin;