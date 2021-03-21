import { createStackNavigator } from "react-navigation-stack";
import Library from '../components/library';
import BookDetails from '../components/bookDetails';
const LibraryContainer = createStackNavigator({
  Library: {
    screen: Library
  },
  BookDetails: {
    screen: BookDetails,
    navigationOptions:{
      title: 'Book Details'
    }
  },
});

export default LibraryContainer