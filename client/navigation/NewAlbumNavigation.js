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
      title: 'New Film',
      headerTransparent: true,
      headerTintColor: '#006e6c',
    } 
  },
});

export default NewAlbumNavigation;