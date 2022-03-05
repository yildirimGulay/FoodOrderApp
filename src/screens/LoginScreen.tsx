import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import {
  ApplicationState,
  OnUserLogin,
  OnUserSignup,
  UserState,
  onVerifyOTP,
  onOTPRequest,
} from '../redux';
import {TextField, ButtonWithTitle, ButtonWithIcon} from '../components';

interface LoginProps {
  OnUserSignup: Function;
  OnUserLogin: Function;
  userReducer: UserState;
  onVerifyOTP: Function;
  onOTPRequest: Function;
  navigation: { navigate: Function}
}

const _LoginScreen: React.FC<LoginProps> = ({
  OnUserLogin,
  OnUserSignup,
  userReducer,
  onVerifyOTP,
  onOTPRequest,
  navigation,
}) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [title, setTitle] = useState('Login');
  const [isSignup, setIsSignup] = useState(false);
  const [otp, setOtp] = useState('');
  const [verified, setVerified] = useState(true);
  const [requestOtpTitle, setRequestOtpTitle] = useState(
    'Request a new OTP in',
  );
  const [canRequestOtp, setCanRequestOtp] = useState(false);

  const {user} = userReducer;

  let countDown: NodeJS.Timer;

  useEffect(() => {
    if (user.token !== undefined) {
      if (user.verified === true) {
        navigation.navigate('Cart');
      } else {
        setVerified(user.verified);
        onEnableOtpRequest();
      }
    }

    return () => {
      clearInterval(countDown);
    };
  }, [user]);

  const onEnableOtpRequest = () => {
    const otpDate = new Date();
    otpDate.setTime(new Date().getTime() + 2 * 60 * 1000);
    const optTime = otpDate.getTime();

    countDown = setInterval(function () {
      const currentTime = new Date().getTime();
      const totalTime = optTime - currentTime;

      let minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((totalTime % (1000 * 60)) / 1000);

      if (seconds < 10) {
        setRequestOtpTitle(`Request a new OTP in ${minutes}:0${seconds}`);
      } else {
        setRequestOtpTitle(`Request a new OTP in ${minutes}:${seconds}`);
      }

      if (minutes < 1 && seconds < 1) {
        setRequestOtpTitle('Request a new OTP');
        setCanRequestOtp(true);
        clearInterval(countDown);
      }
    }, 1000);
  };

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

  const onTapVerify = () => {
    onVerifyOTP(otp, user);
  };

  const onTapRequestNewOTP = () => {
    setCanRequestOtp(false);
    onOTPRequest(user);
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
            onTap={onTapVerify}
            width={340}
            height={50}
          />
          <ButtonWithTitle
            title={requestOtpTitle}
            isNoBg={true}
            onTap={onTapRequestNewOTP}
            width={340}
            height={50}
            disable={!canRequestOtp}
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

const LoginScreen = connect(mapToStateProps, {
  OnUserSignup,
  OnUserLogin,
  onVerifyOTP,
  onOTPRequest,
})(_LoginScreen);

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
