import { createStackNavigator } from 'react-navigation';
import RollScreen from '../components/screens/RollScreen';
import GalleryScreen from '../components/screens/GalleryScreen';
import ImageSlider from '../components/screens/ImageSlider';

const AlbumNavigation = createStackNavigator({
  Roll: { screen: RollScreen,
    navigationOptions: {
      header: null
    }
  },
  Album: { screen: GalleryScreen,
    navigationOptions: {
      title: 'Album',
      headerTransparent: true,
      // headerTitle: 'Al',
      headerTintColor: 'rgb(255, 255, 255)',
      headerTitleStyle: {
        fontWeight: '200',
        fontFamily: 'Montserrat-Regular',
      },
    } 
  },
  Slides: { screen: ImageSlider,
    navigationOptions: {
      header: null,
    } 
  }},  {
    initialroutename: 'Roll'
  }
);

export default AlbumNavigation;4