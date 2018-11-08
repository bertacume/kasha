import {
  createStackNavigator,
} from 'react-navigation';
import RollScreen from '../components/screens/RollScreen';
import ImageList from '../components/container/ImageList';

const AlbumNavigation = createStackNavigator({
  Roll: { screen: RollScreen,
    navigationOptions: {
      title: 'Roll',
    }},
  Album: { screen: ImageList,
    navigationOptions: {
      title: 'Album',
    } },
});

export default AlbumNavigation;