import './category.scss';
import Taro from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import {
  addCategory,
  deleteCategory,
  modifyCategory
} from '../../actions/category';
import { deleteTodos } from '../../actions/todos';
import CatTop from './cat-top';
import CatList from './cat-list';
import { AtNoticebar } from 'taro-ui';

@connect(
  ({ category, todos }) => ({ category, todos }),
  { addCategory, deleteCategory, modifyCategory, deleteTodos }
)
export default class Category extends Taro.Component {
  config = {
    navigationBarTitleText: '清单目录'
  };
  render() {
    const {
      category,
      todos,
      deleteCategory,
      addCategory,
      deleteTodos,
      modifyCategory
    } = this.props;
    return (
      <View className="category">
        <CatTop catTotal={category.length} />
        {Taro.getStorageSync('cateToast') && <AtNoticebar close>
          数据保存在小程序本地缓存中，为保证待办事项数据不丢失，请勿在微信中移除本小程序。
        </AtNoticebar>}
        <CatList
          category={category}
          todos={todos}
          deleteCategory={deleteCategory}
          deleteTodos={deleteTodos}
          addCategory={addCategory}
          modifyCategory={modifyCategory}
        />
      </View>
    );
  }
}
