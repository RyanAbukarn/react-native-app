import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import MyAccountContainer from './MyAccountContainer';
import LeftHeaderButton from '../sheared/leftHeader';

const UserOptionsStack = createStackNavigator(
  {
    Notifications: {
      screen: MyAccountContainer,
      navigationOptions: ({ navigation }) => ({
        headerLeft: <LeftHeaderButton navigation={navigation} />,
        title:"My Account"
      }),
    },
  },
)
export default UserOptionsStack;