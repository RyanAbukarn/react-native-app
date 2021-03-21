import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import createAccount from '../components/createAccount';
import Login from '../components/login'

const AccountContainer = createStackNavigator({
    Login:{
        screen: Login
    },
    CreateAccount: {
        screen: createAccount,
        navigationOptions:{
            title: 'Create Account'
        }
    },
});

const AccountContainerApp = createAppContainer(AccountContainer);
export default AccountContainerApp