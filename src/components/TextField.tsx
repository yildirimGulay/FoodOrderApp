import React, {useState, useEffect} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

interface TextFieldProps {
  placeholder: string;
  isSecure?: boolean;
  onTextChange: Function;
  isOTP?: boolean
}

export const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  isSecure = false,
  onTextChange,
  isOTP = false
}) => {
  const [isPassword, setIsPassword] = useState(false);

  useEffect(() => {
    setIsPassword(isSecure);
  }, []);

  if(isOTP) {

    return(
        <View style={styles.container} >
            <TextInput 
            placeholder={placeholder}
            maxLength={6}
            autoCapitalize='none'
            secureTextEntry={true}
            showSoftInputOnFocus={false}
            keyboardType='numeric'
            onChangeText={(text) => onTextChange(text)}
            style={styles.otpTextField} />
        </View>
    )
} else {

    return(
        <View style={styles.container} >
            <TextInput 
            placeholder={placeholder}
            autoCapitalize='none'
            secureTextEntry={isSecure}
            showSoftInputOnFocus={false}
            keyboardType='numeric'
            onChangeText={(text) => onTextChange(text)}
            style={styles.textField} />
        </View>
    )
}
}



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 50,
    borderRadius: 30,
    backgroundColor: '#DBDBDB',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 20,
    paddingRight: 10,
  },
  textField: {
    flex: 1,
    height: 50,
    fontSize: 20,
    color: '#000',
  },
  otpTextField: {
    flex: 1,
    width: 320,
    height: 50,
    fontSize: 25,
    color: "#000",
    textAlign: "center",
}
});
