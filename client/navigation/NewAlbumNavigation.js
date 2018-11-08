import { createStackNavigator } from 'react-navigation';
import HomeScreen from '../components/screens/HomeScreen';
import NewAlbumScreen from '../components/screens/NewAlbumScreen';

const NewAlbumNavigation = createStackNavigator({
  Home: { screen: HomeScreen,
    navigationOptions: {
      header: null
    }
  },
  NewAlbum: { screen: NewAlbumScreen,
    navigationOptions: {
      title: 'NewAlbum',
      headerTransparent: true,
    } 
  },
});

export default NewAlbumNavigation;