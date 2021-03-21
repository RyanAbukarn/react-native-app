import { createStackNavigator } from "react-navigation-stack";
import OrderDetails from '../components/orederDetails';
import MyLibrary from '../components/myLibrary';
const MyLibraryContainer = createStackNavigator({
      MyLibrary:{
        screen: MyLibrary,
        navigationOptions:{
          title: 'My Library'
        }
      },
      OrderDetails: {
        screen: OrderDetails,
        navigationOptions:{
          title: 'Order Details'
        }
      }
});

export default MyLibraryContainer


