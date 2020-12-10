/* eslint-disable eslint-comments/no-unlimited-disable */
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selectChannelId, selectChannelName} from '../redux/features/AppSlice';
import ChannelsScreen from '../screens/ChannelsScreen';
import ChatScreen from '../screens/ChatScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ProfileScreen from '../screens/ProfileScreen';
import {Text, View, DevSettings, Clipboard} from 'react-native';
import AddChannel from '../screens/AddChannel';
import JoinScreen from '../screens/JoinScreen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {logout} from '../redux/features/UserSlice';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const HomeStack = ({navigation}) => {
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    await dispatch(logout());
    auth().signOut();
    DevSettings.reload();
  };
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStatusBarHeight: 10,
        headerStyle: {
          elevation: 5,
        },
      }}>
      <Stack.Screen
        name="Add Channel"
        component={AddChannel}
        options={{animationEnabled: true}}
      />
      <Stack.Screen
        name="Home"
        component={ChannelsScreen}
        options={{
          headerTitle: 'Channels',
          headerTitleAlign: 'center',
          headerLeft: () => (
            //eslint-disable-next-line
            <View style={{marginLeft: 10}}>
              <FontAwesome5.Button
                name={'plus'}
                size={22}
                backgroundColor="#fff"
                color="#2e64e5"
                onPress={() => navigation.navigate('Add Channel')}
              />
            </View>
          ),
          headerRight: () => (
            //eslint-disable-next-line
            <View style={{marginRight: 10}}>
              <FontAwesome.Button
                name={'user-o'}
                size={22}
                backgroundColor="#fff"
                color="#2e64e5"
                onPress={() => navigation.navigate('Profile')}
              />
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerBackTitleVisible: false,
          headerRight: () => (
            //eslint-disable-next-line
            <View style={{marginRight: 10}}>
              <FontAwesome.Button
                name={'sign-out'}
                size={22}
                backgroundColor="#fff"
                color="#2e64e5"
                onPress={logoutHandler}
              />
            </View>
          ),
        }}
      />
    </Stack.Navigator>
  );
};

const AppStack = () => {
  const chName = useSelector(selectChannelName);
  const chId = useSelector(selectChannelId);
  return (
    <Stack.Navigator
      initialRouteName="Channels"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStatusBarHeight: 10,
        headerStyle: {
          elevation: 5,
        },
      }}>
      <Stack.Screen
        name="Channels"
        component={HomeStack}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={'Chat'}
        component={ChatScreen}
        options={{
          headerTitle: chName,
          headerTitleAlign: 'center',
          headerBackTitleVisible: false,
          headerRight: () => (
            <TouchableOpacity
              // eslint-disable-next-line
              style={{marginRight: 10}}
              onPress={() => Clipboard.setString(chId)}>
              {/* eslint-disable-next-line */}
              <Text style={{color: '#2e64e5'}}>Copy ID</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="Join"
        component={JoinScreen}
        options={{headerTitle: chName, headerTitleAlign: 'center'}}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
