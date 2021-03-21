import { createDrawerNavigator } from "react-navigation-drawer";
import MyAccountInfo from '../components/myAccountInfo'
import Logout from '../components/logout'
import DeleteMyAccount from '../components/deleteMyAccount';
import EditAccount from '../components/editMyAccount'
const MyAccountContainer = createDrawerNavigator({

    MyAccountInfo: {
        screen:MyAccountInfo,
        navigationOptions:{
            title: 'My Account Info'
        }
        
    },
    DeleteMyAccount:{
        screen: DeleteMyAccount,
        navigationOptions:{
            title: 'Delete My Account'
        }
    },
    EditMyAccount: {
        screen: EditAccount,
        navigationOptions:{
            title: 'Edit Account'
        }
        
    },
    Logout: {
        screen: Logout
    }
});

export default MyAccountContainer