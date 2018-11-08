import { createStackNavigator } from 'react-navigation';
import RollScreen from '../components/screens/RollScreen';
import GalleryScreen from '../components/screens/GalleryScreen';

const AlbumNavigation = createStackNavigator({
  Roll: { screen: RollScreen,
    navigationOptions: {
      header: null
    }
  },
  Album: { screen: GalleryScreen,
    navigationOptions: {
      title: 'Album',
    } 
  }},{
    initialroutename: 'Roll'
  }
);

export default AlbumNavigation;