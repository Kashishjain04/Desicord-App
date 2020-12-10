/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SocialButton from '../Components/SocialButton';
import {useDispatch} from 'react-redux';
import {login, logout} from '../redux/features/UserSlice';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-community/google-signin';

const LoginScreen = () => {
  const dispatch = useDispatch();

  const googleLogin = () => {
    GoogleSignin.signIn()
      .then(({idToken}) => {
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        auth().signInWithCredential(googleCredential);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '238008901705-aav5vjhnu1e9i3s6hsegboh9fssrq4aq.apps.googleusercontent.com',
    });
    auth().onAuthStateChanged((user) => {
      if (user) {
        const obj = {
          email: user.email,
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
        };
        dispatch(login(obj));
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <AntDesign
        style={styles.iconStyle}
        name={'user'}
        size={125}
        color="#666"
      />
      <Text style={styles.text}>Desicord</Text>
      <SocialButton
        buttonTitle="Continue with Google"
        btnType={'google'}
        color="#de4d41"
        backgroundColor="#f5e7ea"
        onPress={googleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconStyle: {
    marginTop: -40,
  },
  text: {
    fontSize: 30,
    marginBottom: 50,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
  },
});

export default LoginScreen;
