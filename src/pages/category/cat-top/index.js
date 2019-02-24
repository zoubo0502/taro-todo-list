import Taro from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import top from '../assets/cat-top.jpg';
import './index.scss';

export default class CatTop extends Taro.Component {
  render() {
    return (
      <View className="top">
        <Image src={top} className="img" />
        <View className="catalog">
          <Text className='text'> 清单目录 </Text>
          <Text className='total'>{this.props.catTotal}</Text>
        </View>
      </View>
    );
  }
}
