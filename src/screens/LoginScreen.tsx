import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import {connect} from 'react-redux';

import {ApplicationState, OnUserLogin, OnUserSignup, UserState} from '../redux';
import {TextField, ButtonWithTitle, ButtonWithIcon} from '../components';

interface LoginProps {
  OnUserSignup: Function;
  OnUserLogin: Function;
  userReducer: UserState;
}

const _LoginScreen: React.FC<LoginProps> = ({
  OnUserLogin,
  OnUserSignup,
  userReducer,
}) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('Login');
  const [isSignup, setIsSignup] = useState(true);
  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(false);
  const [requestOtpTitle, setRequestOtpTitle] = useState(
    'Request a new OTP in',
  );
  const [canRequestOtp, setCanRequestOtp] = useState(false);

  console.log(email, phone);
  const onTapAuthenticate = () => {
    if (isSignup) {
      OnUserSignup(email, phone, password);
    } else {
      OnUserLogin(email, password);
    }
  };

  const onTapOptions = () => {
    setIsSignup(!isSignup);
    setTitle(!isSignup ? 'Signup' : 'Login');
  };

  if (!verified) {
    return (
      <View style={styles.container}>
        <View style={styles.body}>
          <Image
            source={require('../images/verify_otp.png')}
            style={styles.image}
          />
          <Text style={styles.text_ver_title}>Verification</Text>
          <Text style={styles.text_enter_number_title}>
            Enter your OTP sent to your mobile number
          </Text>

          <TextField isOTP={true} placeholder="OTP" onTextChange={setOtp} />

          <ButtonWithTitle
            title="Verify OTP"
            onTap={() => {}}
            width={340}
            height={50}
          />
          <ButtonWithTitle
            title={requestOtpTitle}
            isNoBg={true}
            onTap={() => {}}
            width={340}
            height={50}
          />
        </View>

        <View style={styles.footer}></View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <View style={styles.navigation}>
          <Text style={{fontSize: 30, fontWeight: '400'}}>{title}</Text>
        </View>
        <View style={styles.body}>
          <TextField
            placeholder="Email ID"
            onTextChange={setEmail}
            isSecure={false}
          />

          {isSignup && (
            <TextField
              placeholder="Phone Number"
              onTextChange={setPhone}
              isSecure={false}
            />
          )}
          <TextField
            placeholder="Password"
            onTextChange={setPassword}
            isSecure={true}
          />

          <ButtonWithTitle
            title={title}
            height={50}
            width={350}
            onTap={onTapAuthenticate}
          />

          <ButtonWithTitle
            title={
              !isSignup
                ? 'No Account? Signup Here'
                : 'Have an Account? Login Here'
            }
            height={50}
            width={350}
            onTap={onTapOptions}
            isNoBg={true}
          />
        </View>
        <View style={styles.footer}></View>
      </View>
    );
  }
};

const mapToStateProps = (state: ApplicationState) => ({
  userReducer: state.userReducer,
});

const LoginScreen = connect(mapToStateProps, {OnUserSignup, OnUserLogin})(
  _LoginScreen,
);

export {LoginScreen};

const styles = StyleSheet.create({
  container: {flex: 1},
  navigation: {flex: 3, justifyContent: 'center', paddingLeft: 30},
  body: {flex: 6, justifyContent: 'center', alignItems: 'center'},
  footer: {flex: 3},
  image: {
    width: 120,
    height: 120,
    margin: 20,
  },
  text_ver_title: {
    fontSize: 22,
    fontWeight: '600',
    margin: 10,
  },
  text_enter_number_title: {
    fontSize: 16,
    padding: 10,
    marginBottom: 20,
    color: '#716F6F',
  },
});
