import { createBottomTabNavigator } from "react-navigation-tabs";
import {createAppContainer} from "react-navigation";
import LibraryContainer from './LibrayScreen'
import MyLibraryContainer from './MyLibraryContainer'
import UserOptionsStack from './UserOptionsStack'
const RootDrawerNavigator = createBottomTabNavigator({
    Library: {
        screen:LibraryContainer

    },
    MyLibrary:{
        screen:MyLibraryContainer,
        navigationOptions:{
            title: 'My Library'
          }
    },
    MyAccount:{
        screen:UserOptionsStack,
        navigationOptions:{
            title: 'My Account'
          }
    }
})


export default createAppContainer(RootDrawerNavigator);